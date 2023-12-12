<template>
    <div class="d-flex" style="height: 100vh;">
        <div id="map" class="w-100"></div>
    </div>
</template>

<script setup lang="ts">
// Models
import { BuildingInsights, LayerId, SolarLayers, RequestError, Layer, Coordinates } from '@/models/models';
// API
import { getSolarDataLayers, getSingleLayer, findClosestBuilding } from "@/util/googleMapsAPI";
import { onMounted } from 'vue';
// Functions
import { initMap } from "@/util/initMapComponents";

// Emit
const emit = defineEmits(['alert']);
function emitAlert(type: string, title: string, message: string) {
    emit('alert', {
        type: type, 
        title: title, 
        message: message
    });
}

// Google components
let map: google.maps.Map;
let expandedSection: string;
let showPanels = true;
let buildingInsights: BuildingInsights;
let geometryLibrary: google.maps.GeometryLibrary;


onMounted(async () => {
    const coord: Coordinates = { lat: 46.811943, lng: -71.205002 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const parent: HTMLInputElement = document.getElementById("parent-search") as HTMLInputElement;
    
    // Init values of google components
    map = await initMap(coord, mapElement, "SOLAR");
    buildingInsights = await findClosestBuilding(coord);
    geometryLibrary = await google.maps.importLibrary("geometry") as google.maps.GeometryLibrary
    showDataLayer(true);
})




const icon = 'layers';
const title = 'Data Layers endpoint';
const dataLayerOptions: Record<LayerId | 'none', string> = {
    none: 'No layer',
    mask: 'Roof mask',
    dsm: 'Digital Surface Model',
    rgb: 'Aerial image',
    annualFlux: 'Annual sunshine',
    monthlyFlux: 'Monthly sunshine',
    hourlyShade: 'Hourly shade',
};

const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

let dataLayersResponse: SolarLayers | undefined;
let requestError: RequestError | undefined;
let layerId: LayerId | 'none' = 'monthlyFlux';
let layer: Layer | undefined;

let playAnimation = true;
let tick = 0;
let month = 0;
let day = 14;
let hour = 0;

let overlays: google.maps.GroundOverlay[] = [];
let showRoofOnly = false;

async function showDataLayer(reset = false) {
    if (reset) {
        dataLayersResponse = undefined;
        requestError = undefined;
        layer = undefined;

        // Default values per layer.
        showRoofOnly = ['annualFlux', 'monthlyFlux', 'hourlyShade'].includes(layerId);
        map.setMapTypeId(layerId == 'rgb' ? 'roadmap' : 'satellite');
        overlays.map((overlay) => overlay.setMap(null));
        month = layerId == 'hourlyShade' ? 3 : 0;
        day = 14;
        hour = 5;
        playAnimation = ['monthlyFlux', 'hourlyShade'].includes(layerId);
    }

    if (layerId == 'none') {
        return;
    }

    if (!layer) {
        const center = buildingInsights.center;
        const ne = buildingInsights.boundingBox.ne;
        const sw = buildingInsights.boundingBox.sw;
        const diameter = geometryLibrary.spherical.computeDistanceBetween(
            new google.maps.LatLng(ne.latitude, ne.longitude),
            new google.maps.LatLng(sw.latitude, sw.longitude),
        );
        const radius = Math.ceil(diameter / 2);
        try {
            dataLayersResponse = await getSolarDataLayers(center, radius);
        } catch (e) {
            requestError = e as RequestError;
            return;
        }

        try {
            layer = await getSingleLayer(layerId, dataLayersResponse as SolarLayers);
        } catch (e) {
            requestError = e as RequestError;
            return;
        }
    }

    const bounds = layer.bounds;
    console.log('Render layer:', {
        layerId: layer.id,
        showRoofOnly: showRoofOnly,
        month: month,
        day: day,
    });
    overlays.map((overlay) => overlay.setMap(null));
    overlays = layer
        .render(showRoofOnly, month, day)
        .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));

    overlays[0].setMap(map);
}
</script>