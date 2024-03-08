<template>
    <div class="d-flex" style="height: 100vh">
        <v-card id="map-details" class="rounded-0" :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'">
            <map-header :coord="coordRef" @sync-with-new-request="syncWithNewRequest"/>

            <div :class="$vuetify.display.xs ? 'map-data-mobile' : 'map-data-computer'">
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
                            class="w-50 universal-font-theme"
                            :class="airQualityPanel == 0 ? 'button-selection-border' : ''"
                            :prepend-icon="airQualityPanel == 0 ? 'mdi-alert' : 'mdi-alert-outline'"
                            variant="outlined"
                            :ripple="false"
                        >
                            Pollutants
                        </v-btn>
                        <v-btn
                            @click="airQualityPanel = 1"
                            class="w-50 universal-font-theme"
                            :class="airQualityPanel == 1 ? 'button-selection-border' : ''"
                            :prepend-icon="airQualityPanel == 1 ? 'mdi-heart' : 'mdi-heart-outline'"
                            variant="outlined"
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
// Helpers
import { AirQualityData } from "geo-env-typing/air";
import { LatLng } from "geo-env-typing/geo";
import { pollutants, circularBarColorSelector } from "@/helpers/constants";
import { initMapComponents, initMarker } from "@/helpers/util";
// Server
import { getAirQualityData } from "@/server/air";
// Components
import PollutantTab from "@/components/air_quality/PollutantTab.vue";
import HealthTab from "@/components/air_quality/HealthTab.vue";
import MapHeader from "@/components/general/MapHeader.vue";

const airQualityPanel = ref(0);
const airQualityDataDisplayed = ref<AirQualityData>({} as AirQualityData);

let map: google.maps.Map;
let marker: google.maps.Marker;

const coordRef: LatLng = { lat: 46.811943, lng: -71.205002 };

onMounted(async () => {
    const coord: LatLng = { lat: 46.811943, lng: -71.205002 };
    ({ map, marker } = await initMapComponents(coord, "AIR_QUALITY"));
});

async function syncWithNewRequest(newCoord: LatLng, formattedAddress: string) {
    map.setCenter({ lat: newCoord.lat, lng: newCoord.lng });
    marker.setMap(null);
    marker = initMarker(newCoord, map);

    await getAirQualityData(newCoord)
        .then((data: AirQualityData) => {
            airQualityDataDisplayed.value = data;
        })
        .catch(() => {
            // DO_SOMETHING
        });
}
</script>
