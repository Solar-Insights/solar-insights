import { getSingleLayer } from "@/helpers/solar/map/geotiffs";
import { getLayersFromBuildingInsights } from "@/helpers/solar/map/layers";
import { createSolarPanelsFromBuildingInsights } from "@/helpers/solar/map/panels";
import { makeDefaultTimeParams } from "@/helpers/solar/math_and_data/defaultData";
import { TimeParameters } from "@/helpers/types";
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, Layer, MapSettings, SolarLayers, SolarPanelConfig } from "geo-env-typing/solar";
import { defineStore } from "pinia";
import { toRaw } from "vue";

export const useSolarMapVisualsStore = defineStore("solarMapVisualsStore", {
    state: () => ({
        map: {} as google.maps.Map,
        panelConfig: undefined as SolarPanelConfig | undefined,
        solarPanels: [] as google.maps.Polygon[],
        overlays: [] as google.maps.GroundOverlay[],
        layers: undefined as SolarLayers | undefined,
        currentLayer: undefined as Layer | undefined,
        timeParams: {} as TimeParameters,
        geometryLibrary: google.maps.importLibrary("geometry") as Promise<google.maps.GeometryLibrary>
    }),

    actions: {
        setDefaultParametersAndSettings() {
            this.setDefaultTimeParams();
        },

        setDefaultTimeParams() {
            this.timeParams = makeDefaultTimeParams();
        },

        removeRequestData() {
            this.map = {} as google.maps.Map;
            this.panelConfig = undefined;
            this.solarPanels = [];
            this.overlays = [];
            this.layers = undefined;
            this.currentLayer = undefined;
            this.timeParams = {} as TimeParameters;
        },

        setMapCenter(coords: LatLng) {
            this.map.setCenter(coords);
        },

        async makeLayersRequest(mapSettings: MapSettings, buildingInsights: BuildingInsights) {
            this.layers = await getLayersFromBuildingInsights(buildingInsights, mapSettings);
        },

        async syncMapOnLoad(mapSettings: MapSettings, buildingInsights: BuildingInsights, centerCoords: LatLng) {
            this.setMapCenter(centerCoords);
            await this.showHeatmapLayer(mapSettings, buildingInsights);
        },

        async showHeatmapLayer(mapSettings: MapSettings, buildingInsights: BuildingInsights) {
            if (mapSettings.layerId == null || buildingInsights == null) {
                return;
            }
            
            await this.getPreferredLayer(mapSettings);
            this.renderOverlay();
            this.displayCorrectLayer(mapSettings);
        },

        async getPreferredLayer(mapSettings: MapSettings) {
            this.currentLayer = await getSingleLayer(mapSettings.layerId, this.layers as SolarLayers);
        },

        renderOverlay() {
            if (!this.currentLayer) {
                return;
            }

            const bounds = this.currentLayer.bounds;
            const showRoofOnly = true;

            this.overlays.map((overlay) => overlay.setMap(null));
            this.overlays = this.currentLayer
                .render(showRoofOnly, this.timeParams.month, this.timeParams.day)
                .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));
        },

        displayCorrectLayer(mapSettings: MapSettings) {
            if (!this.currentLayer || !mapSettings.showHeatmap) {
                return;
            }

            if (this.currentLayer.id === "monthlyFlux") {
                this.displayMonthlyFlux(mapSettings);
            } else if (this.currentLayer.id === "hourlyShade") {
                this.displayHourlyShade(mapSettings);
            } else {
                this.overlays[0].setMap(this.map);
            }
        },

        displayMonthlyFlux(mapSettings: MapSettings) {
            if (mapSettings.showHeatmap) {
                this.overlays.map((overlay, i) => overlay.setMap(i == this.timeParams.month ? this.map : null));
            }
        },

        displayHourlyShade(mapSettings: MapSettings) {
            if (mapSettings.showHeatmap) {
                this.overlays.map((overlay, i) => overlay.setMap(i == this.timeParams.hour ? this.map : null));
            }
        },

        async panelCountChange(buildingInsights: BuildingInsights, configIdIndex: number, mapSettings: MapSettings) {
            this.removeSolarPanelsFromMap();
            this.setNewPanelConfig(buildingInsights, configIdIndex);
            await this.addSolarPanelsToMap(buildingInsights, mapSettings);
        },

        removeSolarPanelsFromMap() {
            this.solarPanels.map((panel) => toRaw(panel).setMap(null));
            this.solarPanels = [];
        },

        setNewPanelConfig(buildingInsights: BuildingInsights, configIdIndex: number) {
            this.panelConfig = buildingInsights.solarPotential.solarPanelConfigs[configIdIndex];
        },

        async addSolarPanelsToMap(buildingInsights: BuildingInsights, mapSettings: MapSettings) {
            this.solarPanels = await createSolarPanelsFromBuildingInsights(buildingInsights);

            this.solarPanels.map((panel, i) =>
                panel.setMap(
                    mapSettings.showPanels && this.panelConfig && i < this.panelConfig.panelsCount ? this.map : null
                )
            );
        }
    },

    persist: {
        pick: ["layers"]
    } as any as boolean // trick to avoid TS breaking everything related to the store. Methods become unavailable if not boolean
});
