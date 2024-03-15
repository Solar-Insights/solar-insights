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

        <div id="cost-chart" :theme="theme"></div>
        <vue-apex-charts v-if="series.length !== 0" type="line" :series="series" :options="options" height="200px" width="200px"/>
    </v-card>
</template>

<script setup lang="ts">
// Vue
import { onMounted, watch, ref } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
// Helpers
import {
    getBreakEvenYear,
    yearlyEnergyCalc,
    installationCostCalc,
    energyCoveredCalc,
    costWithSolarInstallation,
    costWithoutSolarInstallation,
    yearlyUtilityBillEstimates,
    yearlyCostWithoutSolar
} from "@/helpers/solarMath";
import { drawSolarInsightsChart } from "@/helpers/solar";
import { batteryCharging } from "@/helpers/constants";
import { strToLargeNumberDisplay } from "@/helpers/util";
import VueApexCharts from "vue3-apexcharts";
import { UserSolarData } from "@/helpers/types";


const solarMapStore = useSolarMapStore();
const userSessionStore = useUserSessionStore();

const { userSolarData } = storeToRefs(solarMapStore);
const { theme } = storeToRefs(userSessionStore);

const breakEvenYear = ref(0);
const chart = ref<ApexCharts>();

onMounted(async () => {
    await drawNewChart();
    series.value = await timeSeries(userSolarData.value)
});

watch(userSolarData.value, async () => {
    await drawNewChart();
});

watch(theme, () => {
    updateChartColors();
})

async function drawNewChart() {
    if (chart.value) {
        chart.value.destroy();
    }
    
    const costChart: HTMLElement = document.getElementById("cost-chart")!;
    chart.value = await drawSolarInsightsChart(userSolarData.value, costChart)
    chart.value.render();
    updateChartColors();

    breakEvenYear.value = getBreakEvenYear(userSolarData.value);
}

function updateChartColors() {
    const white = "#FFFFFF";
    const black = "#000000"
    const textColor = theme.value === "light" ? black : white;
    chart.value?.updateOptions({ 
        chart:  {
            foreColor: textColor
        }
    });
}

const series = ref([] as any[]);

const options = ref({
    grid: {
        show: false
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true
        }
    },
    yaxis: {
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true
        },
        labels: {
            formatter: function (value: any) {
                return strToLargeNumberDisplay(value) + "$";
            }
        }
    },
    tooltip: {
        x: {
            format: "yyyy"
        },
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    }
})



async function timeSeries(userSolarData: UserSolarData) {
    const year = new Date().getFullYear();
    const yearsList = [];
    for (let i = year; i < year + userSolarData.installationLifespan; i++) {
        const currentYear = new Date();
        currentYear.setFullYear(i);
        yearsList.push(currentYear);
    }

    let costWithSolar = 0;
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(userSolarData);
    const cumulativeCostWithSolar: [Date, number][] = [];
    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        costWithSolar +=
            i == 0
                ? utilityBillEstimates[i] + installationCostCalc(userSolarData) - userSolarData.solarIncentives
                : utilityBillEstimates[i];
        cumulativeCostWithSolar.push([yearsList[i], Math.round(costWithSolar)]);
    }

    let costWithoutSolar = 0;
    const yearlyCostWithoutSolarEstimates: number[] = yearlyCostWithoutSolar(userSolarData);
    const cumulativeCostWithoutSolar: [Date, number][] = [];
    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        costWithoutSolar += yearlyCostWithoutSolarEstimates[i];
        cumulativeCostWithoutSolar.push([yearsList[i], Math.round(costWithoutSolar)]);
    }

    return [
        {
            name: 'Solar',
            data: cumulativeCostWithSolar
        },
        {
            name: 'Current',
            data: cumulativeCostWithoutSolar
        },
    ]
}
/**
 * Toujours appeler la fonction "drawNewChart" quand on va la modifier
 * Ajouter une balise "dataChanged" pour recalculer les donnees
 * Ajouter une balise "theme" pour choisir les colors de la charte
 */
</script>

