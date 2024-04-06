<template>
    <v-card
        class="rounded-lg map-data"
        :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'"
        elevation="8"
    >
        <v-card-title class="text-center font-weight-regular pl-0 mb-4">
            <div class="d-flex mb-3">
                <v-icon class="mr-3" color="theme">mdi-home-outline</v-icon>
                <div class="my-auto">{{ $t("solar.building-readonly.name") }}</div>
            </div>
            <v-divider />
        </v-card-title>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-math-compass</v-icon>
                <div class="me-auto">{{ $t("solar.building-readonly.roof-area") }}</div>
                <div>
                    {{
                        strToLargeNumberDisplay(buildingInsights?.solarPotential.wholeRoofStats.areaMeters2.toFixed(0))
                    }}
                    m²
                </div>
            </div>
            <div class="detail-text mt-1" style="margin-left: 33.6px">{{ $t("solar.building-readonly.based-on") }}</div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-sun-clock-outline</v-icon>
                <div class="me-auto flex-shrink-1">{{ $t("solar.building-readonly.annual-sunlight") }}</div>
                <div>
                    {{ strToLargeNumberDisplay(buildingInsights?.solarPotential.maxSunshineHoursPerYear.toFixed(0)) }}
                    {{ $t("solar.building-readonly.hours-abbreviation") }}
                </div>
            </div>
            <div class="detail-text mt-1" style="margin-left: 33.6px">
                {{ $t("solar.building-readonly.derived-from") }}
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-solar-power-variant-outline</v-icon>
                <div class="me-auto">{{ $t("solar.building-readonly.panels-caps") }}</div>
                <div>
                    {{ userSolarData.panelCount }} / {{ userSolarData.maxPanelCount }}
                    {{ $t("solar.building-readonly.panels") }}
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-account-hard-hat-outline</v-icon>
                <div class="me-auto">{{ $t("solar.building-readonly.installation-size") }}</div>
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
import { installationSizeCalc } from "@/helpers/solar/solarDataMath";

const solarMapStore = useSolarMapStore();

const { buildingInsights, userSolarData } = storeToRefs(solarMapStore);
</script>
