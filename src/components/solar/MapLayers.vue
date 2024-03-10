<template>
    <div id="map" class="w-100"></div>

    <time-param 
        :layer="layer" 
        :map-settings="mapSettings" 
        @update-time-params="updateTimeParams"
        @display-monthly-flux="displayMonthlyFlux()"
        @display-hourly-shade="displayhourlyShade()"
    />
</template>

<script setup lang="ts">
// Vue
import { PropType, onMounted, ref, watch } from "vue";
// Helpers
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, SolarLayers, Layer, MapSettings } from "geo-env-typing/solar";
import { TimeParameters } from "@/helpers/types";
import { initMapComponents } from "@/helpers/util";
import { getSingleLayer,makeDefaultMapSettings, makeDefaultTimeParams } from "@/helpers/solar";
// Server
import { getSolarLayers } from "@/server/solar";
// Components
import TimeParam from "@/components/solar/TimeParam.vue";

const timeParams = ref<TimeParameters>(makeDefaultTimeParams());

let map: google.maps.Map = {} as google.maps.Map;
let geometryLibrary: google.maps.GeometryLibrary;
let dataLayersResponse: SolarLayers | null;
let overlays: google.maps.GroundOverlay[] = [];
let layer = ref<Layer | undefined>(undefined);
let showRoofOnly = false;

onMounted(async () => {
    ({ map } = await initMapComponents(props.centerCoord, "SOLAR"));

    geometryLibrary = (await google.maps.importLibrary("geometry")) as google.maps.GeometryLibrary;

    emits("updateMap", map)
});

const emits = defineEmits(["updateMap"]);

const props = defineProps({
    centerCoord: {
        type: Object as PropType<LatLng>,
        required: true
    },
    mapSettings: {
        type: Object as PropType<MapSettings>,
        required: true,
        default: makeDefaultMapSettings()
    },
    buildingInsights: {
        type: Object as PropType<BuildingInsights>,
        default: undefined,
    }
});

watch(
    () => props.mapSettings.layerId,
    async () => {
        await showDataLayer(true);
    }
);

watch(
    () => props.mapSettings.showHeatmap,
    async () => {
        props.mapSettings.showHeatmap ? await showDataLayer(true) : resetHeatmapLayer();
    }
);

watch(() => props.buildingInsights, async () => {
    showDataLayer(true);
})

watch(() => props.centerCoord, async () => {
    map.setCenter(props.centerCoord);
})

async function showDataLayer(reset: boolean = false) {
    if (reset) {
        resetDataLayer();
    }

    if (props.mapSettings.layerId == null || props.buildingInsights == null) {
        return;
    }

    if (!layer.value) {
        const center: LatLng = {
            lat: props.buildingInsights.center.latitude,
            lng: props.buildingInsights.center.longitude
        };
        const ne = props.buildingInsights.boundingBox.ne;
        const sw = props.buildingInsights.boundingBox.sw;
        const diameter = geometryLibrary.spherical.computeDistanceBetween(
            new google.maps.LatLng(ne.latitude, ne.longitude),
            new google.maps.LatLng(sw.latitude, sw.longitude)
        );
        const radius = Math.ceil(diameter / 2);

        try {
            dataLayersResponse = await getSolarLayers(center, radius);
            layer.value = await getSingleLayer(props.mapSettings.layerId, dataLayersResponse as SolarLayers);
        } catch (error) {
            return;
        }
    }

    resetHeatmapLayer();
}

function resetDataLayer() {
    dataLayersResponse = null;
    layer.value = undefined;

    // Default values per layer.
    showRoofOnly = ["annualFlux", "monthlyFlux", "hourlyShade"].includes(props.mapSettings.layerId);
    map.setMapTypeId("satellite");
}

function resetHeatmapLayer() {
    if (!layer.value) {
        return;
    }

    const bounds = layer.value.bounds;
    overlays.map((overlay) => overlay.setMap(null));
    if (!props.mapSettings.showHeatmap) {
        return;
    }

    overlays = layer.value
        .render(showRoofOnly, timeParams.value.month, timeParams.value.day)
        .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));


    if (layer.value.id === "monthlyFlux") {
        displayMonthlyFlux();
    } else if (layer.value.id === "hourlyShade") {
        displayhourlyShade();
    } else {
        overlays[0].setMap(map);
    }
}

function displayMonthlyFlux() {
    if (props.mapSettings.showHeatmap) {
        overlays.map((overlay, i) => overlay.setMap(i == timeParams.value.month ? map : null));
    }
}

function displayhourlyShade() {
    if (props.mapSettings.showHeatmap) {
        overlays.map((overlay, i) => overlay.setMap(i == timeParams.value.hour ? map : null));
    }
}

function updateTimeParams(tick: number, month: number, day: number, hour: number) {
    timeParams.value.tick = tick;
    timeParams.value.month = month;
    timeParams.value.day = day;
    timeParams.value.hour = hour;
}
</script>