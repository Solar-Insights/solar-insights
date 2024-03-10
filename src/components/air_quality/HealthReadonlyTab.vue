<template>
    <div class="text-center">
        <v-item-group class="my-4" v-model="healthButtonSelection" mandatory>
            <v-item v-for="group in healthRecommendations" v-slot="{ toggle, isSelected }">
                <v-btn
                    @click="toggle"
                    class="mx-2 my-2"
                    :class="isSelected ? 'button-selection-background' : 'button-non-selection-background'"
                    style="border: 1px solid rgba(129, 129, 129, 0.5)"
                    icon
                    density="comfortable"
                    
                >
                    <v-icon :class="isSelected ? 'icon-selection-color' : 'icon-non-selection-color'">{{
                        group.icon
                    }}</v-icon>
                </v-btn>
            </v-item>
        </v-item-group>

        <v-divider />

        <v-card class="pa-2 rounded-lg text-left" variant="text">
            <div class="mb-2 emphasis" style="font-size: 1.1rem">
                {{ healthRecommendations[healthButtonSelection].displayName }}
            </div>
            <p>
                {{ healthRecommendations[healthButtonSelection].recommendation }}
            </p>
        </v-card>
    </div>
</template>

<script setup lang="ts">
// Vue
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAirMapStore } from "@/stores/airMapStore";
import { healthRecommendationsList } from "@/helpers/air";

const airMapStore = useAirMapStore();

const { airQualityData } = storeToRefs(airMapStore);

const healthButtonSelection = ref(0);
const healthRecommendations = ref(healthRecommendationsList);

onMounted(() => {
    for (let i = 0; i < healthRecommendations.value.length; i++) {
        healthRecommendations.value[i].recommendation =
            airQualityData.value.healthRecommendations[
                healthRecommendations.value[i].group as keyof typeof airQualityData.value.healthRecommendations
            ];
    }
});

</script>
