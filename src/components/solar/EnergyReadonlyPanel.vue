<template>
    <v-card class="rounded-lg" :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'" elevation="8"> 
        <v-card-title class="section-title pl-0 mb-4">
            <div class="d-flex mb-3">
                <v-icon class="mr-3" color="theme">mdi-weather-sunny</v-icon> 
                <div class="my-auto">
                    Solar Insights
                </div>
            </div>
            <v-divider style="border: 1px solid black"/>
        </v-card-title>

        
        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-calendar-clock-outline</v-icon>
                <div class="me-auto emphasis">
                    Yearly Energy
                </div>
                <div>
                    {{ yearlyEnergyCalc(userSolarData).toFixed(0) }} kWh
                </div>
            </div>
        </div>
        
        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-account-hard-hat-outline</v-icon>
                <div class="me-auto emphasis">
                    Installation Size
                </div>  
                <div>
                    {{ installationSizeCalc(userSolarData).toFixed(2) }} kW
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-account-cash-outline</v-icon>
                <div class="me-auto emphasis">
                    Installation Cost
                </div>
                <div>
                    {{ installationCostCalc(userSolarData).toFixed(0) }} $
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">{{ batteryCharging(energyCoveredCalc(userSolarData)) }}</v-icon>
                <div class="me-auto emphasis">
                    Energy Covered
                </div>
                <div>
                    {{ energyCoveredCalc(userSolarData).toFixed(1) }} %
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div> &nbsp</div>
            <div class="d-flex">
                
                <div class="me-auto emphasis">
                    Cost analysis for 25 years
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-transmission-tower</v-icon>
                <div class="me-auto emphasis">
                    Cost without solar panels
                </div>
                <div>
                    {{ costWithoutSolarInstallation(userSolarData).toFixed(0) }} $
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-solar-panel</v-icon>
                <div class="me-auto emphasis">
                    Cost with solar panels
                </div>
                <div>
                    {{ costWithSolarInstallation(userSolarData).toFixed(0) }} $
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-bank-outline</v-icon>
                <div class="me-auto emphasis">
                    Total saved cost
                </div>
                <div>
                    {{ (costWithoutSolarInstallation(userSolarData) - costWithSolarInstallation(userSolarData)).toFixed(0) }}  $
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-scale-balance</v-icon>
                <div class="me-auto emphasis">
                    Break even
                </div>
                <div>
                    {{ breakEvenYear + new Date().getFullYear() }} in {{ breakEvenYear }} years
                </div>
            </div>
        </div>

        <div id="breakeven-chart">

        </div>
    </v-card>
</template>

<script setup lang="ts">
// Vue 
import { PropType, onMounted, watch, ref } from 'vue';
// Util
import { BuildingInsights, UserSolarData } from '@/util/solarTypes';
import { getBreakEvenYear, drawGoogleChart, yearlyEnergyCalc, installationSizeCalc, installationCostCalc, energyCoveredCalc, costWithSolarInstallation, costWithoutSolarInstallation } from "@/util/solarFunctions";
import { batteryCharging } from "@/util/constants";

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