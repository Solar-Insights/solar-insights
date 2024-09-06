<template>
    <div :class="$vuetify.display.smAndDown ? 'map-data-mobile' : 'map-data-computer'">
        <ReadonlyPanelSelector />

        <v-expansion-panels variant="accordion" multiple v-model="expansionPanels">
            <v-expansion-panel elevation="0" value="panels">
                <ExpansionPanels />
            </v-expansion-panel>

            <v-expansion-panel elevation="0" panel="costs">
                <ExpansionCosts />
            </v-expansion-panel>

            <v-expansion-panel elevation="0" value="optimization">
                <ExpansionOptimization />
            </v-expansion-panel>

            <v-expansion-panel elevation="0" value="settings">
                <ExpansionSettings />
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReadonlyPanelSelector from "@/components/solar/building_blocks/data_panel/ReadonlyPanelSelector.vue";
import ExpansionPanels from "@/components/solar/building_blocks/data_panel/ExpansionPanels.vue";
import ExpansionCosts from "@/components/solar/building_blocks/data_panel/ExpansionCosts.vue";
import ExpansionOptimization from "@/components/solar/building_blocks/data_panel/ExpansionOptimization.vue";
import ExpansionSettings from "@/components/solar/building_blocks/data_panel/ExpansionSettings.vue";

const expansionPanels = ref(["settings"]);
</script>
