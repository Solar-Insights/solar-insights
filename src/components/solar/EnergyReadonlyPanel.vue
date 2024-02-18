<template>
    <v-card
        class="rounded-lg"
        :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'"
        elevation="8"
    >
        <v-card-title class="section-title pl-0 mb-4">
            <div class="d-flex mb-3">
                <v-icon class="mr-3" color="theme">mdi-weather-sunny</v-icon>
                <div class="my-auto">Solar Insights</div>
            </div>
            <v-divider style="border: 1px solid black" />
        </v-card-title>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-calendar-clock-outline</v-icon>
                <div class="me-auto emphasis">Yearly Energy</div>
                <div>{{ strToLargeNumberDisplay(yearlyEnergyCalc(userSolarData).toFixed(0)) }} kWh</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-account-hard-hat-outline</v-icon>
                <div class="me-auto emphasis">Installation Size</div>
                <div>{{ strToLargeNumberDisplay(installationSizeCalc(userSolarData).toFixed(1)) }} kW</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-account-cash-outline</v-icon>
                <div class="me-auto emphasis">Installation Cost</div>
                <div>{{ strToLargeNumberDisplay(installationCostCalc(userSolarData).toFixed(0)) }} $</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">{{ batteryCharging(energyCoveredCalc(userSolarData)) }}</v-icon>
                <div class="me-auto emphasis">Energy Covered</div>
                <div>{{ energyCoveredCalc(userSolarData).toFixed(0) }} %</div>
            </div>
        </div>

        <div class="mb-5">
            <div>&nbsp</div>
            <div class="d-flex">
                <div class="me-auto emphasis">Cost analysis for 25 years</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-transmission-tower</v-icon>
                <div class="me-auto emphasis">Cost without solar panels</div>
                <div>{{ strToLargeNumberDisplay(costWithoutSolarInstallation(userSolarData).toFixed(0)) }} $</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-solar-panel</v-icon>
                <div class="me-auto emphasis">Cost with solar panels</div>
                <div>{{ strToLargeNumberDisplay(costWithSolarInstallation(userSolarData).toFixed(0)) }} $</div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-bank-outline</v-icon>
                <div class="me-auto emphasis">Total saved cost</div>
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
                <div class="me-auto emphasis">Break even</div>
                <div>
                    <div v-if="breakEvenYear != -1">
                        {{ breakEvenYear + new Date().getFullYear() }} in {{ breakEvenYear }} years
                    </div>
                    <div v-if="breakEvenYear == -1">- years</div>
                </div>
            </div>
        </div>

        <div id="breakeven-chart"></div>
    </v-card>
</template>

<script setup lang="ts">
// Vue
import { PropType, onMounted, watch, ref } from "vue";
// Helpers
import { BuildingInsights, UserSolarData } from "geo-env-typing/solar";
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

const props = defineProps({
    buildingInsights: {
        type: Object as PropType<BuildingInsights>,
        required: true,
        default: {}
    },
    userSolarData: {
        type: Object as PropType<UserSolarData>,
        required: true,
        default: {}
    }
});

const breakEvenYear = ref(0);

onMounted(() => {
    const costChart: HTMLElement | null = document.getElementById("breakeven-chart");
    drawGoogleChart(props.userSolarData, costChart);
    breakEvenYear.value = getBreakEvenYear(props.userSolarData);
});

watch(props.userSolarData, () => {
    const costChart: HTMLElement | null = document.getElementById("breakeven-chart");
    drawGoogleChart(props.userSolarData, costChart);
    breakEvenYear.value = getBreakEvenYear(props.userSolarData);
});
</script>
