<template>
    <div class="d-flex" style="height: 100vh;">
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
                    Air quality details
                </v-card-title>

                <v-divider/>

                <div v-if="Object.keys(airQualityDataDisplayed).length" class="text-center">
                    <div class="my-4">
                        <div class="mb-2" style="font-size: 1.15rem;">
                            {{ airQualityDataDisplayed.indexes[0].displayName }}
                        </div>

                        <v-progress-circular
                            class="mb-4"
                            :model-value="airQualityDataDisplayed.indexes[0].aqiDisplay"
                            :size="50"
                            :width="7"
                            :color="circularBarColorSelector(airQualityDataDisplayed.indexes[0].aqiDisplay)"
                            style="font-weight: bold;"
                        >
                            {{ airQualityDataDisplayed.indexes[0].aqi }}
                        </v-progress-circular>
                        <div>
                            {{ airQualityDataDisplayed.indexes[0].category }}
                        </div>
                        <div>
                            Dominant pollutant: {{ pollutants[airQualityDataDisplayed.indexes[0].dominantPollutant as keyof typeof pollutants].displayName }}
                        </div>
                    </div>
                    
                    <div class="px-3 mb-4">
                        <v-btn 
                            @click="airQualityPanel = 0;" 
                            class="w-50 h-100 py-4" 
                            :class="airQualityPanel == 0 ? 'button-selection-border' : 'button-non-selection-border'" 
                            :prepend-icon="airQualityPanel == 0 ? 'mdi-alert' : 'mdi-alert-outline'" 
                            variant="flat"
                            :ripple="false"
                        > 
                            Pollutants 
                        </v-btn>
                        <v-btn 
                            @click="airQualityPanel = 1;" 
                            class="w-50 h-100 py-4" 
                            :class="airQualityPanel == 1 ? 'button-selection-border' : 'button-non-selection-border'" 
                            :prepend-icon="airQualityPanel == 1 ? 'mdi-heart' : 'mdi-heart-outline'" 
                            variant="flat"
                            :ripple="false"
                        > 
                            Health 
                        </v-btn>
                    </div>

                    <v-divider/>
                </div>
            </div>
            
            <v-card-text v-if="Object.keys(airQualityDataDisplayed).length" class="air-quality-data">
                <PollutantTab v-if="airQualityPanel == 0" :pollutants="airQualityDataDisplayed.pollutants"/>
                <HealthTab v-if="airQualityPanel == 1" :healthRecommendations="airQualityDataDisplayed.healthRecommendations"/>
            </v-card-text>
        </v-card>

        <div id="map" class="w-100"></div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref } from "vue";
import _ from 'lodash';
// Models
import { Coordinates, AirQualityData } from "@/models/models";
import { pollutants, circularBarColorSelector } from "@/models/constants";
// Functions
import { initMap, initMarker, initAutocomplete } from "@/util/initMapComponents";
import { getGeocoding, getReverseGeocoding, getAirQualityData } from "@/util/googleMapsAPI";
// Components
import PollutantTab from "@/components/air_quality/PollutantTab.vue";
import HealthTab from "@/components/air_quality/HealthTab.vue";

// Emit
const emit = defineEmits(['alert']);
function emitAlert(type: string, title: string, message: string) {
    emit('alert', {
        type: type, 
        title: title, 
        message: message
    });
}

// Component data
const autocompleteValue = ref("");
const airQualityPanel = ref(0);
const airQualityDataDisplayed = ref<AirQualityData>({} as AirQualityData);

// Google components
let map: google.maps.Map;
let marker: google.maps.Marker;
let autocomplete: google.maps.places.Autocomplete;

onMounted(async () => {
    // Setup values
    const coord: Coordinates = { lat: 46.811943, lng: -71.205002 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const parent: HTMLInputElement = document.getElementById("parent-search") as HTMLInputElement;

    // Init values of google components
    map = await initMap(coord, mapElement, "AIR_QUALITY");
    marker = initMarker(coord, map);
    autocomplete = await initAutocomplete("autocomplete-search");
    autocompleteValue.value = await getReverseGeocoding(coord);
    if (map == undefined || marker == undefined || autocomplete == undefined) {
        emitAlert(
            "error", 
            "Could not properly load the map",
            "An error occured when trying to load the map and its components."
        );
    }

    // Add map overlay and autocomplete on map + Perform first air quality fetch
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(parent);
    airQualityDataDisplayed.value = await getAirQualityData(coord);
    airQualityDataHandler();

    // Listeners
    await initListeners(autocomplete, map, marker);
});


async function initListeners(autocomplete: google.maps.places.Autocomplete, map: google.maps.Map, marker: google.maps.Marker) {
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
        marker.setMap(null);
        marker = initMarker(newCoord, map);
        airQualityDataDisplayed.value = await getAirQualityData(newCoord);
    });

    map.addListener("dblclick", async (mouseEvent: any) => {
        const newCoord: Coordinates = {
            lat: mouseEvent.latLng.lat(),
            lng: mouseEvent.latLng.lng()
        };

        const formattedAddress = await getReverseGeocoding(newCoord);
        if ( !formattedAddress ) {
            autocompleteValue.value = "";
            emitAlert(
                "error", 
                "Could not reverse geocode the double click on the map",
                "An error occured when trying to convert geographic Coordinates to an address."
            );
            return;
        }

        map.setCenter({ lat: newCoord.lat, lng: newCoord.lng });
        marker.setMap(null);
        marker = initMarker(newCoord, map);
        airQualityDataDisplayed.value = await getAirQualityData(newCoord);
        airQualityDataHandler();

        autocompleteValue.value = formattedAddress;
    });
}

function airQualityDataHandler() {
    if ( _.isEqual(airQualityDataDisplayed.value, {}) ) {
        emitAlert(
            "error", 
            "Could not fetch the air quality data associated to this address",
            "An error occured when trying to fetch the air quality data. Try again with another address if the problem persists."
        );
    }
}
</script>