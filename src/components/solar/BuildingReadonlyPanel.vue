<template>
    <v-card class="rounded-lg" :class="$vuetify.display.xs ? 'map-readonly-data-mobile' : 'map-readonly-data-computer'" elevation="8"> 
        <v-card-title class="section-title pl-0 mb-4">
            <div class="d-flex mb-3">
                <v-icon class="mr-3" color="theme">mdi-home-outline</v-icon> 
                <div class="my-auto">
                    Building Attributes
                </div>
            </div>
            <v-divider style="border: 1px solid black"/>
        </v-card-title>

        
        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-math-compass</v-icon>
                <div class="me-auto emphasis">
                    Roof area
                </div>
                <div>
                    {{ strToLargeNumberDisplay(buildingInsights?.solarPotential.wholeRoofStats.areaMeters2.toFixed(0)) }} m²
                </div>
            </div>
            <div class="detail-text mt-1" style="margin-left: 33.6px;">
                Based on 3D analysis of the roof
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-sun-clock-outline</v-icon>
                <div class="me-auto emphasis flex-shrink-1">
                    Annual sunlight
                </div>
                <div>
                    {{ strToLargeNumberDisplay(buildingInsights?.solarPotential.maxSunshineHoursPerYear.toFixed(0)) }} hrs
                </div>
            </div>
            <div class="detail-text mt-1" style="margin-left: 33.6px;">
                Derived from daily examination of weather patterns
            </div>
        </div>

        <div class="mb-5">
            <div class="d-flex">
                <v-icon class="mr-3" color="theme">mdi-solar-power-variant-outline</v-icon>
                <div class="me-auto emphasis">
                    Panels
                </div>
                <div>
                    {{ userSolarData.panelCount }} / {{ userSolarData.maxPanelCount }} panels
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
import { strToLargeNumberDisplay } from '@/util/generalFunctions';

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