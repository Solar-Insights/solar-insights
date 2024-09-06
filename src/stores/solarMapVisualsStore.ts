import { getLayerFromBuildingInsights } from "@/helpers/solar/map/layers";
import { createSolarPanelsFromBuildingInsights } from "@/helpers/solar/map/panels";
import {
    makeDefaultTimeParams,
} from "@/helpers/solar/math_and_data/defaultData";
import {
    TimeParameters,
} from "@/helpers/types";
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, Layer, MapSettings, SolarPanelConfig } from "geo-env-typing/solar";
import { defineStore } from "pinia";
import { toRaw } from "vue";

export const useSolarMapVisualsStore = defineStore("solarMapVisualsStore", {
    state: () => ({
        map: {} as google.maps.Map,
        panelConfig: undefined as SolarPanelConfig | undefined,
        solarPanels: [] as google.maps.Polygon[],
        overlays: [] as google.maps.GroundOverlay[],
        layer: undefined as Layer | undefined,
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
            this.layer = undefined;
            this.timeParams = {} as TimeParameters;
        },

        setMapCenter(coords: LatLng) {
            this.map.setCenter(coords);
        },

        async syncMapOnLoad(mapSettings: MapSettings, buildingInsights: BuildingInsights, centerCoords: LatLng) {
            this.setMapCenter(centerCoords);
            await this.showHeatmapLayer(mapSettings, buildingInsights);
        },


        async showHeatmapLayer(mapSettings: MapSettings, buildingInsights: BuildingInsights) {
            if (mapSettings.layerId == null || buildingInsights == null) {
                return;
            }
            
            this.layer = await getLayerFromBuildingInsights(buildingInsights, mapSettings);
            this.displayHeatmapLayer(mapSettings);
        },

        displayHeatmapLayer(mapSettings: MapSettings) {
            this.renderOverlay();
            this.displayCorrectLayer(mapSettings);
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

        displayCorrectLayer(mapSettings: MapSettings) {
            if (!this.layer || !mapSettings.showHeatmap) {
                return;
            }

            if (this.layer.id === "monthlyFlux") {
                this.displayMonthlyFlux(mapSettings);
            } else if (this.layer.id === "hourlyShade") {
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
                    mapSettings.showPanels && this.panelConfig && i < this.panelConfig.panelsCount
                        ? this.map
                        : null
                )
            );
        },

        async showHeatmapChanged(buildingInsights: BuildingInsights, mapSettings: MapSettings) {
            if (mapSettings.showHeatmap) {
                await this.showHeatmapLayer(mapSettings, buildingInsights);
            } else {
                this.displayHeatmapLayer(mapSettings);
            }
        },
    }
});
