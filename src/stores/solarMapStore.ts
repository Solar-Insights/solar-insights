import { defineStore } from "pinia";
import { toRaw } from "vue";
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, Layer, SolarPanelConfig, MapSettings } from "geo-env-typing/solar";
import { FinancialParameters, PanelParameters, SolarReadonlyPanel, TimeParameters, UserSolarData } from "@/helpers/types";
import {
    makeDefaultUserSolarDataObject,
    makeDefaultMapSettings,
    makeDefaultTimeParams,
    makeDefaultFinancialParameters,
    makeDefaultPanelParameters
} from "@/helpers/solar/math_and_data/defaultData";
import { getClosestBuildingInsights } from "@/api/solar";
import { createSolarPanelsFromBuildingInsights } from "@/helpers/solar/map/panels";
import { getLayerFromBuildingInsights } from "@/helpers/solar/map/layers";
import {
    getOptimizedEnergyCoveredConfigId,
    getOptimizedSavingsConfigId
} from "@/helpers/solar/math_and_data/optimizeSolarConfig";
import { monthlyEnergyBillApproximation } from "@/helpers/solar/math_and_data/solarDataMath";
import { objectHasValue } from "@/helpers/componentConditionals";

export const useSolarMapStore = defineStore("solarMapStore", {
    state: () => ({
        // User preferences
        mapSettings: {} as MapSettings,
        financialParameters: {} as FinancialParameters,
        panelParameters: {} as PanelParameters,
        solarReadonlyPanel: "INSIGHTS_READONLY" as SolarReadonlyPanel | undefined,

        // Single request data
        centerCoord: { lat: NaN, lng: NaN } as LatLng,
        address: "",
        buildingInsights: {} as BuildingInsights,
        userSolarData: {} as UserSolarData,
        map: {} as google.maps.Map,
        timeParams: {} as TimeParameters,
        panelConfig: undefined as SolarPanelConfig | undefined,
        solarPanels: [] as google.maps.Polygon[],
        configIdIndex: 0,
        overlays: [] as google.maps.GroundOverlay[],
        layer: undefined as Layer | undefined,
        
        // Utils
        geometryLibrary: google.maps.importLibrary("geometry") as Promise<google.maps.GeometryLibrary>
    }),

    actions: {
        setDefaultParametersAndSettings() {
            !objectHasValue(this.mapSettings) ? this.setDefaultMapSettings() : false;
            !objectHasValue(this.financialParameters) ? this.setDefaultFinancialParameters() : false;
            !objectHasValue(this.panelParameters) ? this.setDefaultPanelParameters() : false;
            
            this.setDynamicUserSolarData();
            this.setDefaultTimeParams();
        },

        setDefaultMapSettings() {
            this.mapSettings = makeDefaultMapSettings();
        },

        setDefaultFinancialParameters() {
            this.financialParameters = makeDefaultFinancialParameters();
            this.setDynamicFinancialParameters();
        },

        setDynamicFinancialParameters() {
            this.financialParameters.averageMonthlyEnergyBill = monthlyEnergyBillApproximation(this.buildingInsights.solarPotential.wholeRoofStats.areaMeters2)
        },

        setDefaultPanelParameters() {
            this.panelParameters = makeDefaultPanelParameters();
            this.setDynamicPanelParameters();
        },

        setDynamicPanelParameters() {
            this.panelParameters.defaultPanelCapacityWatts = this.buildingInsights.solarPotential.panelCapacityWatts;
        },

        setDefaultUserSolarData() {
            this.setDynamicUserSolarData();
        },

        setDynamicUserSolarData() {
            this.userSolarData.minPanelCount = this.buildingInsights.solarPotential.solarPanelConfigs[0].panelsCount;
            this.userSolarData.maxPanelCount =
                this.buildingInsights.solarPotential.solarPanelConfigs[
                    this.buildingInsights.solarPotential.solarPanelConfigs.length - 1
                ].panelsCount;
        },

        removeRequestData() {
            this.centerCoord = { lat: NaN, lng: NaN };
            this.address = "";
            this.buildingInsights = {} as BuildingInsights;
            this.userSolarData = {} as UserSolarData;
            this.map = {} as google.maps.Map;
            this.timeParams = {} as TimeParameters;
            this.panelConfig = undefined;
            this.solarPanels = [];
            this.configIdIndex = 0
            this.overlays = [];
            this.layer = undefined;
        },
        
        setDefaultTimeParams() {
            this.timeParams = makeDefaultTimeParams();
        },

        async makeNewSolarInstallationRequest(coords: LatLng) {
            this.centerCoord = coords;

            await getClosestBuildingInsights(coords)
                .then(async (data: BuildingInsights) => {
                    this.buildingInsights = data;
                })

            return coords;
        },

        async syncMapOnLoad() {
            this.map.setCenter(this.centerCoord);
            await this.showHeatmapLayer();
            this.syncDynamicParameters();
        },

        async showHeatmapLayer() {
            if (this.mapSettings.layerId == null || this.buildingInsights == null) {
                return;
            }

            this.layer = await getLayerFromBuildingInsights(this.buildingInsights, this.mapSettings);
            this.displayHeatmapLayer();
        },

        displayHeatmapLayer() {
            this.renderOverlay();
            this.displayCorrectLayer();
        },

        renderOverlay() {
            if (!this.layer) {
                return;
            }

            const bounds = this.layer.bounds;
            const showRoofOnly = true;

            this.overlays.map((overlay) => overlay.setMap(null));
            this.overlays = this.layer
                .render(showRoofOnly, this.timeParams.month, this.timeParams.day)
                .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));
        },

        displayCorrectLayer() {
            if (!this.layer || !this.mapSettings.showHeatmap) {
                return;
            }

            if (this.layer.id === "monthlyFlux") {
                this.displayMonthlyFlux();
            } else if (this.layer.id === "hourlyShade") {
                this.displayHourlyShade();
            } else {
                this.overlays[0].setMap(this.map);
            }
        },

        displayMonthlyFlux() {
            if (this.mapSettings.showHeatmap) {
                this.overlays.map((overlay, i) => overlay.setMap(i == this.timeParams.month ? this.map : null));
            }
        },

        displayHourlyShade() {
            if (this.mapSettings.showHeatmap) {
                this.overlays.map((overlay, i) => overlay.setMap(i == this.timeParams.hour ? this.map : null));
            }
        },

        syncDynamicParameters() {
            this.setDynamicUserSolarData();
            this.setDynamicFinancialParameters();
            this.setDynamicPanelParameters();
            this.setOptimizedSavingsConfig();
        },

        setOptimizedEnergyCoveredConfig() {
            const configId: number | undefined = getOptimizedEnergyCoveredConfigId(
                this.buildingInsights,
                this.financialParameters, 
                this.panelParameters
            );
            this.setConfigId(configId);
        },

        setOptimizedSavingsConfig() {
            const configId: number | undefined = getOptimizedSavingsConfigId(this.buildingInsights, this.userSolarData, this.financialParameters, this.panelParameters);
            this.setConfigId(configId);
        },

        setConfigId(newConfigId: number | undefined) {
            if (newConfigId === undefined) {
                this.configIdIndex = this.buildingInsights.solarPotential.solarPanelConfigs.length - 1;
            } else {
                this.configIdIndex = newConfigId;
            }

            this.panelCountChange();
        },

        async panelCountChange() {
            if (this.buildingInsights == null) {
                return;
            }

            this.userSolarData.panelCount =
                this.buildingInsights.solarPotential.solarPanelConfigs[this.configIdIndex].panelsCount;

            this.removeSolarPanelsFromMap();
            this.setNewPanelConfig();
            await this.addSolarPanelsToMap();
        },

        removeSolarPanelsFromMap() {
            this.solarPanels.map((panel) => toRaw(panel).setMap(null));
            this.solarPanels = [];
        },

        async setNewPanelConfig() {
            this.panelConfig = this.buildingInsights.solarPotential.solarPanelConfigs[this.configIdIndex];
            this.userSolarData.yearlyEnergyDcKwh = this.panelConfig.yearlyEnergyDcKwh;
            this.userSolarData.panelCount = this.panelConfig.panelsCount;
        },

        async addSolarPanelsToMap() {
            this.solarPanels = await createSolarPanelsFromBuildingInsights(this.buildingInsights);

            this.solarPanels.map((panel, i) =>
                panel.setMap(
                    this.mapSettings.showPanels && this.panelConfig && i < this.panelConfig.panelsCount
                        ? this.map
                        : null
                )
            );
        },

        async showHeatmapChanged() {
            if (this.mapSettings.showHeatmap) {
                await this.showHeatmapLayer()
            } else {
                this.displayHeatmapLayer()
            }
        },

        selectReadonlyPanelToDisplay(buttonClicked: SolarReadonlyPanel) {
            if (!this.solarReadonlyPanel) {
                this.solarReadonlyPanel = buttonClicked;
            } else if (this.solarReadonlyPanel === "BUILDING_READONLY") {
                this.solarReadonlyPanel = this.solarReadonlyPanel === buttonClicked ? undefined : "INSIGHTS_READONLY";
            } else if (this.solarReadonlyPanel === "INSIGHTS_READONLY") {
                this.solarReadonlyPanel = this.solarReadonlyPanel === buttonClicked ? undefined : "BUILDING_READONLY";
            }
        },

        setReadonlyPanelToDisplay(buttonClicked: SolarReadonlyPanel | undefined) {
            this.solarReadonlyPanel = buttonClicked;
        }
    },

    persist: true
});
