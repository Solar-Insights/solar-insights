<template>
    <v-item-group class="my-4" v-model="healthButtonSelection" mandatory>
        <v-item v-for="group in healthRecommendationsList" v-slot="{ toggle, isSelected }">
            <v-btn @click="toggle" class="mx-2 my-2" :class="isSelected ? 'button-selection-background' : 'button-non-selection-background'" icon>
                <v-icon :class="isSelected ? 'icon-selection-color' : 'icon-non-selection-color'" >{{ group.icon }}</v-icon>
            </v-btn>
        </v-item>
    </v-item-group>
    
    <v-card class="ma-3 pa-2 rounded-lg text-left" variant="text">
        <v-card-subtitle class="pl-0 pb-3" style="font-weight: 500">
            {{ healthRecommendationsList[healthButtonSelection].displayName }}
        </v-card-subtitle>
        <div>
            {{ healthRecommendationsList[healthButtonSelection].recommendation }}
        </div>
    </v-card>
</template>

<script setup lang="ts">
// Vue 
import { ref, PropType } from 'vue';
// Models
import { healthRecommendations } from "@/models/models";
import { onMounted } from 'vue';

const props = defineProps({
    healthRecommendations: {
        type: Object as PropType<healthRecommendations>,
        required: true,
        default: {}
    }
});

onMounted(() => {
    for(let i = 0; i < healthRecommendationsList.value.length; i++) {
        healthRecommendationsList.value[i].recommendation = props.healthRecommendations[healthRecommendationsList.value[i].group as keyof typeof props.healthRecommendations];
    }
})

const healthButtonSelection = ref(0);
const healthRecommendationsList = ref([
        {
            index: 0,
            group: "generalPopulation",
            displayName: "General population",
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