<template>
    <v-card
        class="rounded-lg map-data"
        :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'"
        elevation="8"
    >   
        <v-card-title class="text-center font-weight-regular pl-0 mb-4">
            <div class="d-flex mb-3">
                <v-icon class="mr-3" color="theme">mdi-weather-sunny</v-icon>
                <div class="my-auto">Solar Insights</div>
            </div>
            <v-divider style="border-width: 2px;"/>
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
                <v-icon class="mr-3" color="theme">mdi-account-hard-hat-outline</v-icon>
                <div class="me-auto">Installation Size</div>
                <div>{{ strToLargeNumberDisplay(installationSizeCalc(userSolarData).toFixed(1)) }} kW</div>
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
                <div class="me-auto emphasis">Cost analysis for {{ userSolarData.installationLifespan }} years</div>
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

        <v-card class="pa-3 bg-white">
            <div id="breakeven-chart"></div>
        </v-card>
    </v-card>
</template>

<script setup lang="ts">
// Vue
import { onMounted, watch, ref } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
// Helpers
import {
    getBreakEvenYear,
    yearlyEnergyCalc,
    installationSizeCalc,
    installationCostCalc,
    energyCoveredCalc,
    costWithSolarInstallation,
    costWithoutSolarInstallation
} from "@/helpers/solarMath";
import { drawGoogleChart } from "@/helpers/solar";
import { batteryCharging } from "@/helpers/constants";
import { strToLargeNumberDisplay } from "@/helpers/util";

const solarMapStore = useSolarMapStore();

const { userSolarData } = storeToRefs(solarMapStore);

const breakEvenYear = ref(0);

onMounted(() => {
    drawNewChart();
});

watch(userSolarData.value, () => {
    drawNewChart();
});

function drawNewChart() {
    const costChart: HTMLElement | null = document.getElementById("breakeven-chart");
    drawGoogleChart(userSolarData.value, costChart);
    breakEvenYear.value = getBreakEvenYear(userSolarData.value);
}
</script>
