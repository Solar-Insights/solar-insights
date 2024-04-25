import { defineStore } from "pinia";
import { toRaw } from "vue";
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, Layer, SolarPanelConfig, MapSettings } from "geo-env-typing/solar";
import { SolarReadonlyPanel, TimeParameters, UserSolarData } from "@/helpers/types";
import {
    makeDefaultUserSolarDataObject,
    makeDefaultMapSettings,
    makeDefaultTimeParams
} from "@/helpers/solar/defaultData";
import { getClosestBuildingInsights } from "@/api/solar";
import { createSolarPanelsFromBuildingInsights } from "@/helpers/solar/panels";
import { getLayerFromBuildingInsights } from "@/helpers/solar/layers";
import { getOptimizedEnergyCoveredConfigId, getOptimizedSavingsConfigId } from "@/helpers/solar/optimizeSolarConfig";
import { monthlyEnergyBillApproximation } from "@/helpers/solar/solarDataMath";

export const useSolarMapStore = defineStore("solarMapStore", {
    state: () => ({
        buildingInsights: {} as BuildingInsights,
        mapSettings: makeDefaultMapSettings() as MapSettings,
        userSolarData: makeDefaultUserSolarDataObject() as UserSolarData,
        timeParams: makeDefaultTimeParams() as TimeParameters,
        layer: undefined as Layer | undefined,
        overlays: [] as google.maps.GroundOverlay[],
        showRoofOnly: false,
        
        map: {} as google.maps.Map,
        panelConfig: undefined as SolarPanelConfig | undefined,
        solarPanels: [] as google.maps.Polygon[],
        geometryLibrary: google.maps.importLibrary("geometry") as Promise<google.maps.GeometryLibrary>,
        centerCoord: { lat: 46.81221406773517, lng: -71.20572802264097 } as LatLng,
        solarReadonlyPanel: "INSIGHTS_READONLY" as SolarReadonlyPanel | undefined
    }),

    actions: {
        async syncWithNewRequest(coord: LatLng, formattedAddress: string) {
            this.setNewCenterCoord(coord);

            await getClosestBuildingInsights(coord).then(async (data: BuildingInsights) => {
                this.buildingInsights = data;
                await this.showDataLayer(true);
                this.syncTemplateVariablesAndMapFollowingNewRequest();
            });
        },

        setNewCenterCoord(coord: LatLng) {
            this.centerCoord = coord;
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
                this.mapSettings.configIdIndex = this.buildingInsights.solarPotential.solarPanelConfigs.length - 1;
            } else {
                this.mapSettings.configIdIndex = newConfigId;
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
            this.panelConfig = this.buildingInsights.solarPotential.solarPanelConfigs[this.mapSettings.configIdIndex];
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
                this.buildingInsights.solarPotential.solarPanelConfigs[this.mapSettings.configIdIndex].panelsCount;

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
            this.showRoofOnly = ["annualFlux", "monthlyFlux", "hourlyShade"].includes(this.mapSettings.layerId);
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

            this.overlays.map((overlay) => overlay.setMap(null));
            this.overlays = this.layer
                .render(this.showRoofOnly, this.timeParams.month, this.timeParams.day)
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
    }
});
