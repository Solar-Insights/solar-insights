<template>
    <v-card
        class="rounded-lg map-data"
        :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'"
        elevation="8"
    >
        <v-card-title class="text-center font-weight-regular pl-0 mb-4">
            <div class="d-flex mb-3">
                <v-icon class="mr-3" color="theme">mdi-home-outline</v-icon>
                <div class="my-auto">Building Attributes</div>
            </div>
            <v-divider />
        </v-card-title>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-math-compass</v-icon>
                <div class="me-auto">Roof area</div>
                <div>
                    {{
                        strToLargeNumberDisplay(buildingInsights?.solarPotential.wholeRoofStats.areaMeters2.toFixed(0))
                    }}
                    m²
                </div>
            </div>
            <div class="detail-text mt-1" style="margin-left: 33.6px">Based on 3D analysis of the roof</div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-sun-clock-outline</v-icon>
                <div class="me-auto flex-shrink-1">Annual sunlight</div>
                <div>
                    {{ strToLargeNumberDisplay(buildingInsights?.solarPotential.maxSunshineHoursPerYear.toFixed(0)) }}
                    hrs
                </div>
            </div>
            <div class="detail-text mt-1" style="margin-left: 33.6px">
                Derived from daily examination of weather patterns
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-solar-power-variant-outline</v-icon>
                <div class="me-auto">Panels</div>
                <div>{{ userSolarData.panelCount }} / {{ userSolarData.maxPanelCount }} panels</div>
            </div>
        </div>

        
        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-account-hard-hat-outline</v-icon>
                <div class="me-auto">Installation Size</div>
                <div>{{ strToLargeNumberDisplay(installationSizeCalc(userSolarData).toFixed(1)) }} kW</div>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
// Vue
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
// Helpers
import { strToLargeNumberDisplay } from "@/helpers/util";
import { installationSizeCalc } from "@/helpers/solar/solarMath";

const solarMapStore = useSolarMapStore();

const { buildingInsights, userSolarData } = storeToRefs(solarMapStore);
</script>
@/helpers/solar/solarMath@/helpers/solar/solarMath