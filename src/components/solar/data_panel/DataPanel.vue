<template>
    <div :class="$vuetify.display.smAndDown ? 'map-data-mobile' : 'map-data-computer'">
        <ReadonlyPanelSelector/>

        <v-expansion-panels variant="accordion" v-model="expansionPanels">
            <v-expansion-panel elevation="0" value="panels">
                <ExpansionPanels/>
            </v-expansion-panel>

            <v-expansion-panel elevation="0" panel="costs">
                <ExpansionCosts/>
            </v-expansion-panel>

            <v-expansion-panel elevation="0" value="optimization">
                <ExpansionOptimization/>
            </v-expansion-panel>

            <v-expansion-panel elevation="0" value="settings">
                <ExpansionSettings/>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import ReadonlyPanelSelector from "@/components/solar/pc/ReadonlyPanelSelector.vue";
import ExpansionPanels from "@/components/solar/data_panel/ExpansionPanels.vue";
import ExpansionCosts from "@/components/solar/data_panel/ExpansionCosts.vue";
import ExpansionOptimization from "@/components/solar/data_panel/ExpansionOptimization.vue";
import ExpansionSettings from "@/components/solar/data_panel/ExpansionSettings.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights, mapSettings, userSolarData } = storeToRefs(solarMapStore);

const advancedSettingsPanels = ref([] as string[]);
const advancedSettingsSolarPotential = ref([] as string[]);
const expansionPanels = ref(["settings"]);

const emits = defineEmits(["showBuildingReadonlyPanel", "showInsightsReadonlyPanel"]);

async function syncMapWithPanels() {
    await solarMapStore.syncMapWithNewRequest();
}

async function showDataLayerOnLayerIdChange() {
    await solarMapStore.showDataLayer(true);
}

async function changeLayersOnShowHeatmapChange() {
    mapSettings.value.showHeatmap ? await solarMapStore.showDataLayer(true) : solarMapStore.resetHeatmapLayer();
}
</script>
