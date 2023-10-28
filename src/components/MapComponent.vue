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
                <template v-for="(pollutant, i) in pollutantsInformations" :key="i">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card v-bind="props" class="ma-3 pa-2 rounded-lg" variant="plain" :elevation="isHovering ? 6 : 0" :style="isHovering ? 'border: 2px solid #4C8BF5' : ''">
                            <v-row>
                                <v-col cols="auto" class="me-auto pb-1">
                                    {{ pollutant.displayName }}
                                </v-col>
                                <v-col cols="auto" class="pb-1">
                                    {{ pollutant.concentration }} {{ pollutant.unitsMeasured }}
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="auto" class="me-auto pt-1">
                                    {{ pollutant.fullName }}
                                </v-col>
                                <v-col cols="auto" class="pt-1">
                                    <v-btn variant="text" density="compact" icon="mdi-information-outline" :color="isHovering ? '#4C8BF5' : 'black'"/>

                                    <v-tooltip max-width="300" activator="parent" open-delay="200" :open-on-hover="false" open-on-click close-on-content-click>
                                        <v-card-subtitle>
                                            Effects
                                        </v-card-subtitle>
                                        {{ pollutant.effects }} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque saepe sint laboriosam maxime, animi magni ab veniam, nisi natus quam eius beatae tempore quisquam qui molestias architecto nihil pariatur maiores?

                                        <v-divider class="my-2"/>

                                        <v-card-subtitle> 
                                            Sources
                                        </v-card-subtitle>
                                        {{ pollutant.sources }}
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                </template>
            </div>

            <div v-if="airQualityPanel == 1">
                Health
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

// Refs
const autocompleteValue = ref("");
const airQualityDataDisplayed = ref<airQualityData>({});

const airQualityPanel = ref(0);
const pollutantsInformations = reactive({
    co: {
        index: 0,
        code: "co",
        displayName: "CO",
        fullName: "Carbon monoxide",
        unitsMeasured: "ppb",
        concentration: 101.10,
        effects: "effects blabla",
        sources: "sources blabla"
    },
    c6h6 : {
        index: 1,
        code: "c6h6",
        displayName: "C6H6",
        fullName: "Benzene",
        unitsMeasured: "μg/m³",
        concentration: 11.977,
        effects: "effects blabla",
        sources: "sources blabla"
    },
    ox : {
        index: 2,
        code: "ox",
        displayName: "OX",
        fullName: "Photochemical oxidants",
        unitsMeasured: "ppb",
        concentration: 20.10,
        effects: "effects blabla",
        sources: "sources blabla"
    },
});
const healthRecommendations = reactive({
    athletes: "healthrecom",
    children: "healthrecom",
    elderly: "healthrecom",
    generalPopulation: "healthrecom",
    heartDiseasePopulation: "healthrecom",
    lungDiseasePopulation: "healthrecom",
    pregnantWomen: "healthrecom"
});

// Google components
let map: google.maps.Map;
let marker: google.maps.Marker;
let labelOnlyMap: google.maps.StyledMapType;
let autocomplete: google.maps.places.Autocomplete;;

onMounted(async () => {
    // Setup values
    const coord: coordinates = { lat: 46.811943, lng: -71.205002 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const infoWindowAnchor: HTMLElement = document.getElementById("test") as HTMLElement;
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
    console.log(airQualityDataDisplayed.value)

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