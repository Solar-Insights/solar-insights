<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
    <!-- <div id="parent-search" class="w-100"> 
        <v-text-field
            v-model="autocompleteValue"
            id="autocomplete-search"
            class="bg-white ml-3 my-6 rounded-xl w-50"
            placeholder="Find a location"
            prepend-inner-icon="mdi-magnify"
            hide-details
            single-line
            solo
        />
    </div>
    <v-expansion-panels id="test" class="bg-white w-25 h-50 ml-3" style="position: fixed; top: 80px;" v-model="pollutantsPanel">
        <v-expansion-panel expand-icon="mdi-plus" collapse-icon="mdi-minus" v-model="pollutantsPanel">
            <v-expansion-panel-title color="red" style="font-size: 18px; font-weight: 400;">
                Pollutants
            </v-expansion-panel-title>
            <v-expansion-panel-text class="h-50" style="overflow-y: scroll;">
                {{  airQualityDataDisplayed }}
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels> -->

    <v-card id="test" class="bg-white w-25 h-75 ml-3 rounded-lg" style="position: fixed; top: 80px;">
        <v-card-title class="text-center" style="font-weight: lighter;">
            Air quality details
        </v-card-title>

        <v-divider class="mx-4"/>

        <v-card-text class="px-0 text-center">
            <div class="mb-2" style="font-size: 1.15rem;">
                Universal AQI
            </div>

            <div class="mb-4">
                <v-progress-circular
                    class="mb-4"
                    :model-value="50"
                    :size="50"
                    :width="7"
                    color="red"
                >
                    50
                </v-progress-circular>
                <div style="font-weight: 500">
                    Moderate air quality
                </div>
                <div style="font-weight: lighter;">
                    Dominant polluant: CO
                </div>
            </div>

            <v-btn-toggle class="w-100 mb-2" variant="outlined" mandatory v-model="airQualityPanel">
                <v-btn class="w-50" prepend-icon="mdi-alert" style="text-transform: none !important;"> Pollutants </v-btn>
                <v-btn class="w-50" prepend-icon="mdi-heart" style="text-transform: none !important;"> Health </v-btn>
            </v-btn-toggle>

            <div v-if="airQualityPanel == 0">
                <PollutantTab :pollutants="airQualityDataDisplayed.pollutants"/>
            </div>

            <div v-if="airQualityPanel == 1">
                <HealthTab :healthRecommendations="airQualityDataDisplayed.healthRecommendations"/>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref, reactive } from "vue";
// Models
import { coordinates, airQualityData } from "@/models/models";
// Functions
import { initMap, initLabelOnlyMap, initAutocomplete, addMarker, getCoordinatesFromAddress, getAirQualityData } from "@/plugins/googleMapsAPI";
// Components
import PollutantTab from "@/components/PollutantTab.vue";
import HealthTab from "@/components/HealthTab.vue";

// Component data
const autocompleteValue = ref("");
const airQualityPanel = ref(1);
const airQualityDataDisplayed = ref<airQualityData>({} as airQualityData);

// Google components
let map: google.maps.Map;
let marker: google.maps.Marker;
let labelOnlyMap: google.maps.StyledMapType;
let autocomplete: google.maps.places.Autocomplete;;

onMounted(async () => {
    // Setup values
    const coord: coordinates = { lat: 46.811943, lng: -71.205002 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const parent: HTMLInputElement = document.getElementById("parent-search") as HTMLInputElement;

    // Init values of google components
    map = await initMap(coord, mapElement);
    marker = addMarker(coord, map);
    labelOnlyMap = initLabelOnlyMap();
    autocomplete = await initAutocomplete("autocomplete-search");

    // Add map overlay and autocomplete on map + Perform first air quality fetch
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(parent);
    map.overlayMapTypes.push(labelOnlyMap as google.maps.MapType);
    airQualityDataDisplayed.value = await getAirQualityData(coord);
    console.log(airQualityDataDisplayed.value
    )
    // Listener for the autocomplete component - Get new place -> Display new position -> Replace marker -> Get air quality data
    autocomplete.addListener("place_changed", async () => {
        const newPlace = autocomplete.getPlace();
        if ( !newPlace || !newPlace.formatted_address ) {
            console.log("User entered the name of a Place that was not suggested and pressed the Enter key, or the Place Details request failed. Display error message");
            return;
        }

        const newCoord = await getCoordinatesFromAddress(newPlace.formatted_address);
        if ( !newCoord ) {
            console.log("An error occured when getting the coordinate of the formatted address");
            return;
        }
        map.setCenter( { lat: newCoord.lat, lng: newCoord.lng } );
        marker.setMap(null);
        marker = addMarker(newCoord, map);
        airQualityDataDisplayed.value = await getAirQualityData(newCoord);
    });
});
</script>