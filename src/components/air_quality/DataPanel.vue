<template>
    <div :class="$vuetify.display.xs ? 'map-data-mobile' : 'map-data-computer'">
        <div v-if="Object.keys(airQualityData).length" class="text-center">
            <div class="mt-3 mb-8">
                <div class="mb-2">
                    {{ airQualityData.indexes[0].displayName }}
                </div>

                <v-progress-circular
                    class="mb-4"
                    :model-value="airQualityData.indexes[0].aqiDisplay"
                    :size="50"
                    :width="7"
                    :color="circularBarColorSelector(airQualityData.indexes[0].aqiDisplay)"
                    style="font-weight: bold"
                >
                    {{ airQualityData.indexes[0].aqi }}
                </v-progress-circular>
                <div class="mb-2">
                    <v-icon class="mr-2" size="medium">mdi-medal-outline</v-icon>
                    {{ airQualityData.indexes[0].category }}
                </div>
                <div>
                    <v-icon class="mr-2" size="medium">mdi-exclamation-thick</v-icon>
                    Dominant pollutant -
                    {{
                        pollutants[
                            airQualityData.indexes[0].dominantPollutant as keyof typeof pollutants
                        ].displayName
                    }}
                </div>
            </div>

            <div class="mb-4">
                <v-btn
                    @click="readonlyPanel = 0"
                    class="w-50 universal-font-theme"
                    :class="readonlyPanel == 0 ? 'button-selection-border' : ''"
                    :prepend-icon="readonlyPanel == 0 ? 'mdi-alert' : 'mdi-alert-outline'"
                    variant="outlined"
                    :ripple="false"
                >
                    Pollutants
                </v-btn>
                <v-btn
                    @click="readonlyPanel = 1"
                    class="w-50 universal-font-theme"
                    :class="readonlyPanel == 1 ? 'button-selection-border' : ''"
                    :prepend-icon="readonlyPanel == 1 ? 'mdi-heart' : 'mdi-heart-outline'"
                    variant="outlined"
                    :ripple="false"
                >
                    Health
                </v-btn>
            </div>

            <v-divider />

            <div v-if="Object.keys(airQualityData).length">
                <pollutant-readonly-tab v-if="readonlyPanel == 0"/>
                <health-readonly-tab v-if="readonlyPanel == 1"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
import _ from "lodash";
import { useAirMapStore } from "@/stores/airMapStore";
import { storeToRefs } from "pinia";
// Helpers
import { pollutants, circularBarColorSelector } from "@/helpers/constants";
// Components
import PollutantReadonlyTab from "@/components/air_quality/PollutantReadonlyTab.vue";
import HealthReadonlyTab from "@/components/air_quality/HealthReadonlyTab.vue";

const airMapStore = useAirMapStore();

const { airQualityData } = storeToRefs(airMapStore);

const readonlyPanel = ref(0);

</script>