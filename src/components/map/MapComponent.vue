<template>
    <div id="map" class="w-100 h-100"></div>
    <!-- 
        Search bar goes over air quality details so that it can stay even on scroll
    -->
    <v-card 
        id="air-quality-details" 
        :class="$vuetify.display.xs ? 'air-quality-details-mobile' : 'air-quality-details-computer'"
    >
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

        <v-card-text v-if="Object.keys(airQualityDataDisplayed).length" class="px-0 text-center">
            <div class="mb-2" style="font-size: 1.15rem;">
                {{ airQualityDataDisplayed.indexes[0].displayName }}
            </div>

            <div class="mb-4">
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
                    Dominant polluant: {{ pollutants[airQualityDataDisplayed.indexes[0].dominantPollutant as keyof typeof pollutants].displayName }}
                </div>
            </div>

            <div class="w-100 mb-2">
                <v-btn 
                    @click="airQualityPanel = 0;" 
                    class="w-50 h-100 py-4" 
                    :class="airQualityPanel == 0 ? 'button-selection-border' : 'button-non-selection-border'" 
                    :prepend-icon="airQualityPanel == 0 ? 'mdi-alert' : 'mdi-alert-outline'" 
                    variant="flat"
                > 
                    Pollutants 
                </v-btn>
                <v-btn 
                    @click="airQualityPanel = 1;" 
                    class="w-50 h-100 py-4" 
                    :class="airQualityPanel == 1 ? 'button-selection-border' : 'button-non-selection-border'" 
                    :prepend-icon="airQualityPanel == 1 ? 'mdi-heart' : 'mdi-heart-outline'" 
                    variant="flat"
                > 
                    Health 
                </v-btn>
            </div>

            <PollutantTab v-if="airQualityPanel == 0" :pollutants="airQualityDataDisplayed.pollutants"/>

            <HealthTab v-if="airQualityPanel == 1" :healthRecommendations="airQualityDataDisplayed.healthRecommendations"/>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref } from "vue";
// Models
import { coordinates, airQualityData } from "@/models/models";
import { pollutants, circularBarColorSelector } from "@/models/constants";
// Functions
import { initMap, initMarker, initAutocomplete } from "@/components/util_functions/initMapComponents";
import { getGeocoding, getReverseGeocoding, getAirQualityData } from "@/google/googleMapsAPI";
// Components
import PollutantTab from "@/components/map/PollutantTab.vue";
import HealthTab from "@/components/map/HealthTab.vue";

// Component data
const autocompleteValue = ref("");
const airQualityPanel = ref(0);
const airQualityDataDisplayed = ref<airQualityData>({} as airQualityData);

// Google components
let map: google.maps.Map;
let marker: google.maps.Marker;
let autocomplete: google.maps.places.Autocomplete;;

onMounted(async () => {
    // Setup values
    const coord: coordinates = { lat: 46.811943, lng: -71.205002 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const parent: HTMLInputElement = document.getElementById("parent-search") as HTMLInputElement;

    // Init values of google components
    map = await initMap(coord, mapElement);
    marker = initMarker(coord, map);
    autocomplete = await initAutocomplete("autocomplete-search");
    autocompleteValue.value = await getReverseGeocoding(coord);

    // Add map overlay and autocomplete on map + Perform first air quality fetch
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(parent);
    airQualityDataDisplayed.value = await getAirQualityData(coord);

    // Listeners
    await initListeners(autocomplete, map, marker);
});


async function initListeners(autocomplete: google.maps.places.Autocomplete, map: google.maps.Map, marker: google.maps.Marker) {
    autocomplete.addListener("place_changed", async () => {
        const newPlace = autocomplete.getPlace();
        if ( !newPlace || !newPlace.formatted_address ) {
            console.log("User entered the name of a Place that was not suggested and pressed the Enter key, or the Place Details request failed. Display error message");
            return;
        }

        const newCoord = await getGeocoding(newPlace.formatted_address);
        if ( !newCoord ) {
            console.log("An error occured when getting the coordinate of the formatted address");
            autocompleteValue.value = "";
            return;
        }
        
        map.setCenter({ lat: newCoord.lat, lng: newCoord.lng });
        marker.setMap(null);
        marker = initMarker(newCoord, map);
        airQualityDataDisplayed.value = await getAirQualityData(newCoord);
    });

    map.addListener("dblclick", async (mouseEvent: any) => {
        const newCoord: coordinates = {
            lat: mouseEvent.latLng.lat(),
            lng: mouseEvent.latLng.lng()
        };

        const formattedAddress = await getReverseGeocoding(newCoord);
        if ( !formattedAddress ) {
            console.log("An error occured when reverse geocoding the coordinate");
            autocompleteValue.value = "";
            return;
        }


        map.setCenter({ lat: newCoord.lat, lng: newCoord.lng});
        marker.setMap(null);
        marker = initMarker(newCoord, map);
        airQualityDataDisplayed.value = await getAirQualityData(newCoord);
        autocompleteValue.value = formattedAddress;
    });
}
</script>