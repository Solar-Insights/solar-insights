<template>
    <v-btn icon>
        <v-icon>mdi-file-document-plus-outline</v-icon>
        <v-dialog activator="parent" max-width="600">
            <v-card
                prepend-icon="mdi-file-document-plus-outline"
                title="Save the solar installation"
            >
                <v-card-text class="mt-5">
                    <div class="form-subtitle-in-card"> Included data </div>
                    <v-sheet class="form-section-in-sheet">
                        <v-switch
                            v-model="solarInsightsAndParameters"
                            color="theme"
                            density="compact"
                        >
                            <template v-slot:label>
                                <span class="ml-4">
                                    Solar insights and parameters
                                </span>
                            </template>
                        </v-switch>

                        <v-switch
                            v-model="buildingAttributes"
                            color="theme"
                            density="compact"
                        >
                            <template v-slot:label>
                                <span class="ml-4">
                                    Building attributes
                                </span>
                            </template>
                        </v-switch>

                        <v-switch
                            v-model="panelConfiguration"
                            color="theme"
                            density="compact"
                        >
                            <template v-slot:label>
                                <span class="ml-4">
                                    Panel configuration
                                </span>
                            </template>
                        </v-switch>
                    </v-sheet>
                    
                    <v-card-subtitle class="font-weight-medium"> Format </v-card-subtitle>
                    <v-sheet class="form-section-in-sheet">
                        
                    </v-sheet>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";

const solarMapStore = useSolarMapStore();

const { } = storeToRefs(solarMapStore);

const solarInsightsAndParameters = ref<boolean>(true); // userSolarData + financial
const buildingAttributes = ref<boolean>(true); // part of buildingInsights
const panelConfiguration = ref<boolean>(true); // part of buildingInsights
</script>