<template>
    <v-card class="rounded-lg" :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'" elevation="8"> 
        <v-card-title class="section-title pl-0 mb-4 d-flex">
            <v-icon class="mr-3" color="theme">mdi-transmission-tower</v-icon> 
            <div class="my-auto">
                Energy Insights
            </div>
        </v-card-title>
        
        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-home-lightning-bolt-outline</v-icon>
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
                <v-icon class="mr-3" color="theme">mdi-hammer-wrench</v-icon>
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
                <v-icon class="mr-3" color="theme">mdi-battery-60</v-icon>
                <div class="me-auto emphasis">
                    Energy Covered
                </div>
                <div>
                    {{ energyCoveredCalc(userSolarData).toFixed(1) }} %
                </div>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
// Vue 
import { PropType } from 'vue';
// Util
import { BuildingInsights, UserSolarData } from '@/util/solarTypes';
import { yearlyEnergyCalc, installationSizeCalc, installationCostCalc, energyCoveredCalc } from "@/models/constants";

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
</script>