<template>
    <v-item-group v-model="healthButtonSelection" mandatory>
        <v-item v-for="group in healthRecommendations.healthRecommendations" v-slot="{ toggle, isSelected }">
            <v-btn @click="toggle" class="mx-2 my-1" icon :style="isSelected ? 'background-color: #4C8BF5;' : ''">
                <v-icon :color="isSelected ? 'white' : '#949494'">{{ group.icon }}</v-icon>
            </v-btn>
        </v-item>
    </v-item-group>

    <v-divider class="my-2"/>
    
    <v-card class="ma-3 pa-2 rounded-lg text-left" variant="text">
        <v-card-subtitle class="pl-0 pb-3" style="font-weight: 500">
            {{ healthRecommendations.healthRecommendations[healthButtonSelection].displayName }}
        </v-card-subtitle>
        {{ healthRecommendations.healthRecommendations[healthButtonSelection].recommendation }}
    </v-card>
</template>

<script setup lang="ts">
// Vue 
import { ref, reactive } from 'vue';

const healthButtonSelection = ref(0);
const healthRecommendations = reactive({
    healthRecommendations: [
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
    ]
});
</script>