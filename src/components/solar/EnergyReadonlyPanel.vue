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
                <v-icon class="mr-3" color="theme">mdi-home-lightning-bolt</v-icon>
                <div class="me-auto emphasis">
                    Yearly Energy
                </div>
                <div>
                    {{ yearlyEnergy.toFixed(0) }} kWh
                </div>
            </div>
        </div>
        
        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-hammer</v-icon>
                <div class="me-auto emphasis">
                    Installation Size
                </div>  
                <div>
                    {{ (panelCount * panelPowerRating / 1000).toFixed(0) }} kW
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-hammer</v-icon>
                <div class="me-auto emphasis">
                    Installation Cost
                </div>
                <div>
                    {{ (installationPerKwh * panelCount * panelPowerRating).toFixed(0) }} $
                </div>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
// Vue 
import { PropType } from 'vue';
// Models
import { BuildingInsights } from "@/models/models";

const props = defineProps({
    buildingInsights: {
        type: Object as PropType<BuildingInsights>,
        required: true,
        default: {}
    },
    panelCount: {
        type: Number,
        required: true,
        default: 0
    },
    maxNbOfPanels: {
        type: Number,
        required: true,
        default: 0
    },
    yearlyEnergy: {
        type: Number,
        required: true,
        default: 0
    },
    monthlyEnergyCost: {
        type: Number,
        required: true,
        default: 0
    },
    installationPerKwh: {
        type: Number,
        required: true,
        default: 0
    },
    panelPowerRating: {
        type: Number,
        required: true,
        default: 0
    }
});
</script>