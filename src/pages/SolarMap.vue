<template>
    <div class="d-flex flex-row-reverse" style="height: 100vh;">
        <v-card 
            id="air-quality-details" 
            :class="$vuetify.display.xs ? 'air-quality-details-mobile' : 'air-quality-details-computer'"
        >
            <!-- Header of air quality details -->
            <div>
                <v-text-field
                    v-model="autocompleteValue"
                    id="autocomplete-search"
                    :class="$vuetify.display.xs ? 'autocomplete-search-mobile' : 'autocomplete-search-computer'"
                    placeholder="Find a location"
                    prepend-inner-icon="mdi-google-maps"
                    hide-details
                    single-line
                    variant="solo"
                    rounded
                />

                <v-divider/>

                <v-card-title class="text-center" style="font-weight: lighter;">
                    Solar data
                </v-card-title>

                <v-divider/>
            </div>
        </v-card>

        <div id="map" class="w-100"></div>
    </div>
</template>

<script setup lang="ts">
// Models
import { BuildingInsights, LayerId, SolarLayers, RequestError, Layer, Coordinates } from '@/models/models';
// API
import { getSolarDataLayers, getSingleLayer, findClosestBuilding, getReverseGeocoding, getGeocoding } from "@/util/googleMapsAPI";
import { onMounted, ref } from 'vue';
// Functions
import { initMap, initAutocomplete } from "@/util/initMapComponents";

// Emit
const emit = defineEmits(['alert']);
function emitAlert(type: string, title: string, message: string) {
    emit('alert', {
        type: type, 
        title: title, 
        message: message
    });
}

// Components data
const autocompleteValue = ref("");

// Google components
let map: google.maps.Map;
let autocomplete: google.maps.places.Autocomplete;
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
    autocomplete = await initAutocomplete("autocomplete-search");
    autocompleteValue.value = await getReverseGeocoding(coord);
    if (map == undefined || autocomplete == undefined) {
        emitAlert(
            "error", 
            "Could not properly load the map",
            "An error occured when trying to load the map and its components."
        );
    }

    await initListeners(autocomplete, map);

    buildingInsights = await findClosestBuilding(coord);
    geometryLibrary = await google.maps.importLibrary("geometry") as google.maps.GeometryLibrary
    showDataLayer(true);
})

async function initListeners(autocomplete: google.maps.places.Autocomplete, map: google.maps.Map) {
    autocomplete.addListener("place_changed", async () => {
        const newPlace: google.maps.places.PlaceResult = autocomplete.getPlace();
        if ( !newPlace || !newPlace.formatted_address ) {
            emitAlert(
                "warning", 
                "Could not process the prompted address",
                "Choose a valid address from the dropdown menu."
            );
            return;
        }

        const newCoord: Coordinates | undefined = await getGeocoding(newPlace.formatted_address);
        if ( !newCoord ) {
            autocompleteValue.value = "";
            emitAlert(
                "error", 
                "Could not geocode the prompted address",
                "An error occured when trying to convert the address to geographic Coordinates."
            );
            return;
        }
        
        map.setCenter({ lat: newCoord.lat, lng: newCoord.lng });
        buildingInsights = await findClosestBuilding(newCoord);
        showDataLayer(true);
    });
}



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
let layerId: LayerId | 'none' = 'annualFlux';
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