<template>
    <div class="d-flex" style="height: 100vh">
        <v-card id="map-details" :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'">
            <v-card-title class="map-title"> <v-icon class="mr-2">mdi-weather-windy</v-icon> Air Quality </v-card-title>

            <v-row class="autocomplete-container">
                <v-text-field
                    v-model="autocompleteValue"
                    @keypress.enter="prepareHandlerEnterKeyOnSearchBar"
                    id="autocomplete-search"
                    :class="$vuetify.display.xs ? 'autocomplete-search-mobile' : 'autocomplete-search-computer'"
                    placeholder="Find a location"
                    hide-details
                    variant="outlined"
                    prepend-inner-icon="mdi-google-maps"
                >
                </v-text-field>
            </v-row>

            <div :class="$vuetify.display.xs ? 'map-data-mobile' : 'mt-0 pt-0 map-data-computer'">
                <div v-if="Object.keys(airQualityDataDisplayed).length" class="text-center">
                    <div class="mt-3 mb-8">
                        <div class="mb-2">
                            {{ airQualityDataDisplayed.indexes[0].displayName }}
                        </div>

                        <v-progress-circular
                            class="mb-4"
                            :model-value="airQualityDataDisplayed.indexes[0].aqiDisplay"
                            :size="50"
                            :width="7"
                            :color="circularBarColorSelector(airQualityDataDisplayed.indexes[0].aqiDisplay)"
                            style="font-weight: bold"
                        >
                            {{ airQualityDataDisplayed.indexes[0].aqi }}
                        </v-progress-circular>
                        <div class="mb-2">
                            <v-icon class="mr-2" size="medium">mdi-medal-outline</v-icon>
                            {{ airQualityDataDisplayed.indexes[0].category }}
                        </div>
                        <div>
                            <v-icon class="mr-2" size="medium">mdi-exclamation-thick</v-icon>
                            Dominant pollutant -
                            {{
                                pollutants[
                                    airQualityDataDisplayed.indexes[0].dominantPollutant as keyof typeof pollutants
                                ].displayName
                            }}
                        </div>
                    </div>

                    <div class="mb-4">
                        <v-btn
                            @click="airQualityPanel = 0"
                            class="w-50 h-100 py-4 universal-font-theme"
                            :class="airQualityPanel == 0 ? 'button-selection-border' : 'button-non-selection-border'"
                            :prepend-icon="airQualityPanel == 0 ? 'mdi-alert' : 'mdi-alert-outline'"
                            variant="flat"
                            :ripple="false"
                        >
                            Pollutants
                        </v-btn>
                        <v-btn
                            @click="airQualityPanel = 1"
                            class="w-50 h-100 py-4 universal-font-theme"
                            :class="airQualityPanel == 1 ? 'button-selection-border' : 'button-non-selection-border'"
                            :prepend-icon="airQualityPanel == 1 ? 'mdi-heart' : 'mdi-heart-outline'"
                            variant="flat"
                            :ripple="false"
                        >
                            Health
                        </v-btn>
                    </div>

                    <v-divider />

                    <div v-if="Object.keys(airQualityDataDisplayed).length">
                        <PollutantTab v-if="airQualityPanel == 0" :pollutants="airQualityDataDisplayed.pollutants" />
                        <HealthTab
                            v-if="airQualityPanel == 1"
                            :healthRecommendations="airQualityDataDisplayed.healthRecommendations"
                        />
                    </div>
                </div>
            </div>
        </v-card>

        <div id="map" class="w-100"></div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref } from "vue";
import _ from "lodash";
import { useUserSessionStore } from "@/stores/userSessionStore";
// Helpers
import { AirQualityData } from "geo-env-typing/air";
import { Coordinates } from "geo-env-typing/geo";
import { pollutants, circularBarColorSelector } from "@/helpers/constants";
import { initMapComponents, initMarker, prepareHandlerEnterKeyOnSearchBar } from "@/helpers/util";
import { AutocompleteInputError } from "@/helpers/customErrors";
// Server
import { getAirQualityData } from "@/server/air";
import { getGeocoding, getReverseGeocoding } from "@/server/geo";
// Components
import PollutantTab from "@/components/air_quality/PollutantTab.vue";
import HealthTab from "@/components/air_quality/HealthTab.vue";

const userSessionStore = useUserSessionStore();

const autocompleteValue = ref<string | null>("");
const airQualityPanel = ref(0);
const airQualityDataDisplayed = ref<AirQualityData>({} as AirQualityData);

let map: google.maps.Map;
let marker: google.maps.Marker;
let autocomplete: google.maps.places.Autocomplete;

onMounted(async () => {
    const coord: Coordinates = { lat: 46.811943, lng: -71.205002 };
    ({ map, marker, autocomplete } = await initMapComponents(coord, "AIR_QUALITY"));

    autocompleteValue.value = await getReverseGeocoding(coord)
        .then((address: string) => {
            return address;
        })
        .catch((error) => {
            return ""; // DO_SOMETHING
        });

    await getAirQualityData(coord)
        .then((data: AirQualityData) => {
            airQualityDataDisplayed.value = data;
        })
        .catch(() => {
            // DO_SOMETHING
        });

    await initListeners();
});

async function initListeners() {
    await setPlaceChangedOnAutocompleteListener();
    await setDblClickListenerToMap();
}

let autocompleteAlreadyChanged: boolean = false; // Because enter key triggers 2 events, prevent first one from sending request

async function setPlaceChangedOnAutocompleteListener() {
    autocomplete.addListener("place_changed", async () => {
        const newPlace: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (!newPlace || !newPlace.formatted_address) {
            if (autocompleteAlreadyChanged) {
                userSessionStore.setAlert(new AutocompleteInputError());
                autocompleteAlreadyChanged = false;
                return;
            } else {
                autocompleteAlreadyChanged = true;
                return;
            }
        }

        autocompleteAlreadyChanged = false;
        await getGeocoding(newPlace.formatted_address)
            .then(async (newCoord: Coordinates) => {
                await syncWithNewRequest(newCoord, newPlace.formatted_address!);
            })
            .catch((error) => {
                autocompleteValue.value = ""; // DO_SOMETHING
            });
    });
}

async function setDblClickListenerToMap() {
    map.addListener("dblclick", async (mouseEvent: any) => {
        const newCoord: Coordinates = {
            lat: mouseEvent.latLng.lat(),
            lng: mouseEvent.latLng.lng()
        };

        const formattedAddress = await getReverseGeocoding(newCoord)
            .then((address: string) => {
                return address;
            })
            .catch((error) => {
                return ""; // DO_SOMETHING
            });

        formattedAddress === "" ? true : await syncWithNewRequest(newCoord, formattedAddress);
    });
}

async function syncWithNewRequest(newCoord: Coordinates, formattedAddress: string) {
    map.setCenter({ lat: newCoord.lat, lng: newCoord.lng });
    marker.setMap(null);
    marker = initMarker(newCoord, map);
    autocompleteValue.value = formattedAddress;

    await getAirQualityData(newCoord)
        .then((data: AirQualityData) => {
            airQualityDataDisplayed.value = data;
        })
        .catch(() => {
            // DO_SOMETHING
        });
}
</script>
