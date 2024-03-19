// Vue
import { defineStore } from "pinia";
import { toRaw } from "vue";
// Helpers
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, Layer, SolarPanelConfig, MapSettings, SolarLayers } from "geo-env-typing/solar";
import { panelCapacityRatioCalc, dcToAcDerate, yearlyEnergyConsumptionKwh, normalize } from "@/helpers/solar/solarDataMath";
import { makeCumulativeCostWithoutSolar, makeCumulativeCostWithSolar } from "@/helpers/solar/yearlyAndCumulativeCosts"
import { SolarReadonlyPanel, TimeParameters, UserSolarData } from "@/helpers/types";
import { panelsPalette } from "@/helpers/constants";
import { rgbToColor, createPalette } from "@/helpers/solar/colorPalettes";
import { getSingleLayer } from "@/helpers/solar/geotiffs";
import { makeDefaultUserSolarDataObject, makeDefaultMapSettings, makeDefaultTimeParams, } from "@/helpers/solar/defaultData";
// Server
import { getClosestBuildingInsights, getSolarLayers } from "@/server/solar";
import { createSolarPanelsFromBuildingInsights } from "@/helpers/solar/panels";

export const useSolarMapStore = defineStore("solarMapStore", {
    state: () => ({
        buildingInsights: {} as BuildingInsights,
        mapSettings: makeDefaultMapSettings() as MapSettings,
        userSolarData: makeDefaultUserSolarDataObject() as UserSolarData,
        timeParams: makeDefaultTimeParams() as TimeParameters,
        layer: undefined as Layer | undefined,
        dataLayersResponse: null as SolarLayers | null,
        overlays: [] as google.maps.GroundOverlay[],
        showRoofOnly: false,

        map: {} as google.maps.Map,
        panelConfig: undefined as SolarPanelConfig | undefined,
        solarPanels: [] as google.maps.Polygon[],
        geometryLibrary: google.maps.importLibrary("geometry") as Promise<google.maps.GeometryLibrary>,
        centerCoord: { lat: 46.81701, lng: -71.36838 } as LatLng,
        solarReadonlyPanel: "BUILDING_READONLY" as SolarReadonlyPanel | undefined,
    }),

    actions: {
        async syncWithNewRequest(coord: LatLng, formattedAddress: string) {
            this.setNewCenterCoord(coord);

            await getClosestBuildingInsights(coord)
                .then(async (data: BuildingInsights) => {
                    this.buildingInsights = data;
                    await this.showDataLayer(true);
                })
                .catch(() => {
                    // Handle error
                });

            this.syncTemplateVariablesAndMapFollowingNewRequest();
        },

        setNewCenterCoord(coord: LatLng) {
            this.centerCoord = coord;
            this.map.setCenter(coord);
        },

        syncTemplateVariablesAndMapFollowingNewRequest() {
            this.userSolarData.minPanelCount = this.buildingInsights.solarPotential.solarPanelConfigs[0].panelsCount;
            this.userSolarData.defaultPanelCapacityWatts = this.buildingInsights.solarPotential.panelCapacityWatts;
            this.userSolarData.maxPanelCount =
                this.buildingInsights.solarPotential.solarPanelConfigs[
                    this.buildingInsights.solarPotential.solarPanelConfigs.length - 1
                ].panelsCount;

            this.setOptimizedEnergyCoveredConfig();
        },

        setOptimizedEnergyCoveredConfig() {
            let configId: number | undefined;

            for (let i = 0; i < this.buildingInsights.solarPotential.solarPanelConfigs.length; i++) {
                if (
                    this.buildingInsights.solarPotential.solarPanelConfigs[i].yearlyEnergyDcKwh *
                        panelCapacityRatioCalc(this.userSolarData) *
                        dcToAcDerate(this.userSolarData) >=
                    yearlyEnergyConsumptionKwh(this.userSolarData)
                ) {
                    configId = i;
                    break;
                }
            }

            this.setConfigId(configId);
        },

        setOptimizedSavingsConfig() {
            let configId: number | undefined;
            let maxSavings: number = 0;

            for (let i = 0; i < this.buildingInsights.solarPotential.solarPanelConfigs.length; i++) {
                const userSolarDataForSpecificConfigId: UserSolarData = this.createUserSolarDataForSpecificConfigId(i);
                const finalCumulativeCostWithSolar: number = makeCumulativeCostWithSolar(userSolarDataForSpecificConfigId).pop()!;
                const finalCumulativeCostWithoutSolar: number = makeCumulativeCostWithoutSolar(userSolarDataForSpecificConfigId).pop()!;
                const solarSavings = finalCumulativeCostWithoutSolar - finalCumulativeCostWithSolar;

                if (i === 0) {
                    maxSavings = solarSavings;
                } else if (solarSavings < maxSavings) {
                    configId = i;
                    break;
                } else {
                    maxSavings = solarSavings;
                }
            }

            this.setConfigId(configId);
        },

        createUserSolarDataForSpecificConfigId(configIdIndex: number) {
            const userSolarDataCopy: UserSolarData = JSON.parse(JSON.stringify(this.userSolarData));
            // Only these parameters change based on the configId
            userSolarDataCopy.panelCount = this.buildingInsights.solarPotential.solarPanelConfigs[configIdIndex].panelsCount;
            userSolarDataCopy .yearlyEnergyDcKwh = this.buildingInsights.solarPotential.solarPanelConfigs[configIdIndex].yearlyEnergyDcKwh;

            return userSolarDataCopy;
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

            if (this.mapSettings.layerId == null || this.buildingInsights == null) {
                return;
            }

            if (!this.layer) {
                const geometryLib = await this.geometryLibrary;
                const center: LatLng = {
                    lat: this.buildingInsights.center.latitude,
                    lng: this.buildingInsights.center.longitude
                };
                const ne = this.buildingInsights.boundingBox.ne;
                const sw = this.buildingInsights.boundingBox.sw;
                const diameter = geometryLib.spherical.computeDistanceBetween(
                    new google.maps.LatLng(ne.latitude, ne.longitude),
                    new google.maps.LatLng(sw.latitude, sw.longitude)
                );
                const radius = Math.ceil(diameter / 2);

                try {
                    this.dataLayersResponse = await getSolarLayers(center, radius);
                    this.layer = await getSingleLayer(this.mapSettings.layerId, this.dataLayersResponse as SolarLayers);
                } catch (error) {
                    return;
                }
            }

            this.resetHeatmapLayer();
        },

        resetDataLayer() {
            this.dataLayersResponse = null;
            this.layer = undefined;

            // Default values per layer.
            this.showRoofOnly = ["annualFlux", "monthlyFlux", "hourlyShade"].includes(this.mapSettings.layerId);
            this.map.setMapTypeId("satellite");
        },

        resetHeatmapLayer() {
            this.renderOverlay();
            this.displayCorrectLayer();
        },

        renderOverlay() {
            if (!this.layer || !this.mapSettings.showHeatmap) {
                return;
            }

            const bounds = this.layer.bounds;

            this.overlays.map((overlay) => overlay.setMap(null));
            this.overlays = this.layer
                .render(this.showRoofOnly, this.timeParams.month, this.timeParams.day)
                .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));
        },

        displayCorrectLayer() {
            if (!this.layer) {
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
                this.solarReadonlyPanel = this.solarReadonlyPanel === buttonClicked ? undefined : "INSIGHTS_READONLY"
            } else if (this.solarReadonlyPanel === "INSIGHTS_READONLY") {
                this.solarReadonlyPanel = this.solarReadonlyPanel === buttonClicked ? undefined : "BUILDING_READONLY"
            }
        }
    }
});
