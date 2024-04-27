]<template>
    <v-btn icon>
        <v-icon>mdi-file-document-plus-outline</v-icon>
        
        <v-dialog activator="parent" max-width="600">
            <v-card>
                <v-card-title class="mt-3">
                    <div class="d-flex">
                        <v-icon>mdi-file-document-plus-outline</v-icon>
                        <div class="ml-4">Save the solar installation</div>
                    </div>
                </v-card-title>

                <v-card-text>
                    <div class="form-subtitle-in-card"> Included data </div>
                    <v-sheet class="form-section-in-sheet">
                        <v-switch v-model="solarInsightsAndParameters" class="switch-custom-label" label="Solar insights and parameters" color="theme" density="compact"/>

                        <v-switch v-model="buildingAttributes" class="switch-custom-label" label="Building attributes" color="theme" density="compact"/>

                        <v-switch v-model="panelConfiguration" class="switch-custom-label" label="Panel configuration" color="theme" density="compact"/>
                    </v-sheet>
                    
                    <div class="form-subtitle-in-card"> Format </div>
                    <v-sheet class="form-section-in-sheet">
                        <v-radio-group color="theme">
                            <v-radio class="radio-custom-label" label="Json"/>

                            <v-radio class="radio-custom-label" label="Json"/>
                        </v-radio-group>
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