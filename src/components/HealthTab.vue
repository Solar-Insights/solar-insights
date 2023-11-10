<template>
    <v-item-group v-model="healthButtonSelection" mandatory>
        <v-item v-for="group in healthRecommendationsList" v-slot="{ toggle, isSelected }">
            <v-btn @click="toggle" class="mx-2 my-1" icon :style="isSelected ? 'background-color: #4C8BF5;' : ''">
                <v-icon :color="isSelected ? 'white' : '#949494'">{{ group.icon }}</v-icon>
            </v-btn>
        </v-item>
    </v-item-group>

    <v-divider class="my-2"/>
    
    <v-card class="ma-3 pa-2 rounded-lg text-left" variant="text">
        <v-card-subtitle class="pl-0 pb-3" style="font-weight: 500">
            {{ healthRecommendationsList[healthButtonSelection].displayName }}
        </v-card-subtitle>
        {{ healthRecommendationsList[healthButtonSelection].recommendation }}
    </v-card>
</template>

<script setup lang="ts">
// Vue 
import { ref, PropType, watch } from 'vue';
// Models
import { healthRecommendations } from "@/models/models";

const props = defineProps({
    healthRecommendations: {
        type: Object as PropType<healthRecommendations>,
        required: true,
        default: {}
    }
});
watch( () => props.healthRecommendations, () => {
    for(let i = 0; i < healthRecommendationsList.value.length; i++) {
        healthRecommendationsList.value[i].recommendation = props.healthRecommendations[healthRecommendationsList.value[i].group as keyof typeof props.healthRecommendations];
    }
}) 

const healthButtonSelection = ref(0);
const healthRecommendationsList = ref([
        {
            index: 0,
            group: "generalPopulation",
            displayName: "General Population",
            recommendation: "",
            icon: "mdi-account-group"
        },
        {
            index: 1,
            group: "children",
            displayName: "Children",
            recommendation: "",
            icon: "mdi-baby-carriage"
        },
        {
            index: 2,
            group: "elderly",
            displayName: "Senior citizens",
            recommendation: "",
            icon: "mdi-human-cane"
        },
        {
            index: 3,
            group: "athletes",
            displayName: "Athletes",
            recommendation: "",
            icon: "mdi-weight-lifter"
        },
        {
            index: 4,
            group: "pregnantWomen",
            displayName: "Pregnant women",
            recommendation: "",
            icon: "mdi-human-pregnant"
        },
        {
            index: 5,
            group: "heartDiseasePopulation",
            displayName: "Individuals with heart-related issues",
            recommendation: "",
            icon: "mdi-heart"
        },
        {
            index: 6,
            group: "lungDiseasePopulation",
            displayName: "Individuals with lung-related issues",
            recommendation: "",
            icon: "mdi-lungs"
        },
]);
</script>