<template>
    <v-card
        class="rounded-lg map-data"
        :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'"
        elevation="8"
    >
        <v-card-title class="text-center font-weight-regular pl-0 mb-4">
            <div class="d-flex mb-3">
                <v-icon class="mr-3" color="theme">mdi-flash-outline</v-icon>
                <div class="my-auto">Solar Insights</div>
            </div>
            <v-divider style="border-width: 2px" />
        </v-card-title>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-calendar-clock-outline</v-icon>
                <div class="me-auto">Yearly Energy</div>
                <div>{{ strToLargeNumberDisplay(yearlyEnergyCalc(userSolarData).toFixed(0)) }} kWh</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-account-cash-outline</v-icon>
                <div class="me-auto">Installation Cost</div>
                <div>{{ strToLargeNumberDisplay(installationCostCalc(userSolarData).toFixed(0)) }} $</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">{{ batteryCharging(energyCoveredCalc(userSolarData)) }}</v-icon>
                <div class="me-auto">Energy Covered</div>
                <div>{{ energyCoveredCalc(userSolarData).toFixed(0) }} %</div>
            </div>
        </div>

        <div class="mb-5">
            <div>&nbsp</div>
            <div class="d-flex">
                <div class="me-auto">Cost analysis for {{ userSolarData.installationLifespan }} years</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-transmission-tower</v-icon>
                <div class="me-auto">Cost without solar panels</div>
                <div>{{ strToLargeNumberDisplay(costWithoutSolarInstallation(userSolarData).toFixed(0)) }} $</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-solar-panel</v-icon>
                <div class="me-auto">Cost with solar panels</div>
                <div>{{ strToLargeNumberDisplay(costWithSolarInstallation(userSolarData).toFixed(0)) }} $</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-bank-outline</v-icon>
                <div class="me-auto">Total saved cost</div>
                <div>
                    {{
                        strToLargeNumberDisplay(
                            (
                                costWithoutSolarInstallation(userSolarData) - costWithSolarInstallation(userSolarData)
                            ).toFixed(0)
                        )
                    }}
                    $
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-scale-balance</v-icon>
                <div class="me-auto">Break even</div>
                <div>
                    <div v-if="breakEvenYear != -1">
                        {{ breakEvenYear + new Date().getFullYear() }} in {{ breakEvenYear }} years
                    </div>
                    <div v-if="breakEvenYear == -1">- years</div>
                </div>
            </div>
        </div>

        <vue-apex-charts 
            :class="theme === 'light' ? 'light-theme-chart' : 'dark-theme-chart'" 
            type="line" 
            :series="timeSeries" 
            :options="chartOptions"
        />
    </v-card>
</template>

<script setup lang="ts">
// Vue
import { computed } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
// Helpers
import {
    yearlyEnergyCalc,
    installationCostCalc,
    energyCoveredCalc,
    costWithSolarInstallation,
} from "@/helpers/solar/solarDataMath";
import { getBreakEvenYear, costWithoutSolarInstallation} from "@/helpers/solar/yearlyAndCumulativeCosts";
import { makeChartOptions, makeTimeSeriesFromUserSolarData } from "@/helpers/solar/charts";
import { batteryCharging } from "@/helpers/constants";
import { strToLargeNumberDisplay } from "@/helpers/util";
import VueApexCharts from "vue3-apexcharts";

const solarMapStore = useSolarMapStore();
const userSessionStore = useUserSessionStore();

const { userSolarData } = storeToRefs(solarMapStore);
const { theme } = storeToRefs(userSessionStore);

const timeSeries = computed(() => makeTimeSeriesFromUserSolarData(userSolarData.value));
const chartOptions = computed(() => makeChartOptions(theme.value));
const breakEvenYear = computed(() => getBreakEvenYear(userSolarData.value));
</script>
