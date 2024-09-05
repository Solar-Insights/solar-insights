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

export const useSolarMapStore = defineStore("solarMapStore", {
    state: () => ({
        // User preferences
        mapSettings: makeDefaultMapSettings() as MapSettings,
        solarReadonlyPanel: "INSIGHTS_READONLY" as SolarReadonlyPanel | undefined,
        financialParameters: makeDefaultFinancialParameters() as FinancialParameters,
        panelParameters: makeDefaultPanelParameters() as PanelParameters,

        // Single request data
        centerCoord: { lat: NaN, lng: NaN } as LatLng,
        address: "",
        buildingInsights: {} as BuildingInsights,
        userSolarData: makeDefaultUserSolarDataObject() as UserSolarData,
        map: {} as google.maps.Map,
        timeParams: makeDefaultTimeParams() as TimeParameters,
        panelConfig: undefined as SolarPanelConfig | undefined,
        solarPanels: [] as google.maps.Polygon[],
        configIdIndex: 0,
        overlays: [] as google.maps.GroundOverlay[],
        layer: undefined as Layer | undefined,
        
        // Utils
        geometryLibrary: google.maps.importLibrary("geometry") as Promise<google.maps.GeometryLibrary>
    }),

    actions: {
        resetDefaultMapSettings() {
            this.mapSettings = makeDefaultMapSettings();
        },

        resetDefaultFinancialSettings() {
            // todo
        },

        resetDefaultPanelsSettings() {
            // todo
        },

        resetRequestData() {
            this.centerCoord = { lat: NaN, lng: NaN };
            this.address = "";
            this.buildingInsights = {} as BuildingInsights;
            this.userSolarData = makeDefaultUserSolarDataObject() as UserSolarData;
            this.map = {} as google.maps.Map;
            this.timeParams = makeDefaultTimeParams();
            this.panelConfig = undefined;
            this.solarPanels = [];
            this.configIdIndex = 0
            this.overlays = [];
            this.layer = undefined;
        },

        async syncWithNewRequest(coords: LatLng) {
            this.centerCoord = coords;

            await getClosestBuildingInsights(coords)
                .then(async (data: BuildingInsights) => {
                    this.buildingInsights = data;
                })

            return coords;
        },

        async syncMapOnLoad() {
            this.setNewMapCenter(this.centerCoord);
            await this.showDataLayer(true);
            this.syncTemplateVariablesAndMapFollowingNewRequest();
        },

        setNewMapCenter(coord: LatLng) {
            this.map.setCenter(coord);
        },

        syncTemplateVariablesAndMapFollowingNewRequest() {
            this.userSolarData.averageMonthlyEnergyBill = monthlyEnergyBillApproximation(
                this.buildingInsights.solarPotential.wholeRoofStats.areaMeters2
            );
            this.userSolarData.minPanelCount = this.buildingInsights.solarPotential.solarPanelConfigs[0].panelsCount;
            this.userSolarData.defaultPanelCapacityWatts = this.buildingInsights.solarPotential.panelCapacityWatts;
            this.userSolarData.maxPanelCount =
                this.buildingInsights.solarPotential.solarPanelConfigs[
                    this.buildingInsights.solarPotential.solarPanelConfigs.length - 1
                ].panelsCount;

            this.setOptimizedSavingsConfig();
        },

        setOptimizedEnergyCoveredConfig() {
            const configId: number | undefined = getOptimizedEnergyCoveredConfigId(
                this.buildingInsights,
                this.userSolarData
            );
            this.setConfigId(configId);
        },

        setOptimizedSavingsConfig() {
            const configId: number | undefined = getOptimizedSavingsConfigId(this.buildingInsights, this.userSolarData);
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

        async syncMapWithNewRequest() {
            if (this.buildingInsights == null) {
                return;
            }

            this.removeSolarPanelsFromMap();
            this.setNewPanelConfig();
            this.addSolarPanelsToMap();
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

        async panelCountChange() {
            this.userSolarData.panelCount =
                this.buildingInsights.solarPotential.solarPanelConfigs[this.configIdIndex].panelsCount;

            await this.syncMapWithNewRequest();
        },

        async showDataLayer(reset: boolean = false) {
            if (reset) {
                this.resetDataLayer();
            }

            if (this.mapSettings.layerId == null || this.buildingInsights == null || this.layer) {
                return;
            }

            this.layer = await getLayerFromBuildingInsights(this.buildingInsights, this.mapSettings);

            this.resetHeatmapLayer();
        },

        resetDataLayer() {
            this.layer = undefined;
            this.map.setMapTypeId("satellite");
        },

        resetHeatmapLayer() {
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
