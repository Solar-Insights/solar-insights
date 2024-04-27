<template>
    <div>
        <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
            <v-icon class="mr-3">mdi-cog-outline</v-icon>
            <span class="my-auto"> {{ $t(`solar.data-panel.data-panels.settings.name`) }} </span>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
            <div class="detail-text mb-5">
                Settings to control what information is currently being displayed on the map
            </div>

            <div>
                <v-select
                    v-model="mapSettings.layerId"
                    @update:modelValue="showDataLayerOnLayerIdChange"
                    item-title="displayedName"
                    item-value="name"
                    :items="mapSettings.layerIdChoices"
                    :label="$t(`solar.data-panel.data-panels.settings.displayed-data`)"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                    rounded
                >
                </v-select>

                <v-switch
                    v-model="mapSettings.showPanels"
                    @change="syncMapWithPanels"
                    inset
                    color="theme"
                    density="compact"
                    class="switch-custom-label"
                    :label="$t(`solar.data-panel.data-panels.settings.display-panels`)"
                />

                <v-switch
                    v-model="mapSettings.showHeatmap"
                    @change="changeLayersOnShowHeatmapChange"
                    inset
                    color="theme"
                    density="compact"
                    class="switch-custom-label"
                    :label="$t(`solar.data-panel.data-panels.settings.display-heatmap`)"
                />

                <v-switch
                    v-model="mapSettings.heatmapAnimation"
                    inset
                    color="theme"
                    density="compact"
                    :disabled="
                        !mapSettings.showHeatmap || !['monthlyFlux', 'hourlyShade'].includes(mapSettings.layerId)
                    "
                    class="switch-custom-label"
                    :label="$t(`solar.data-panel.data-panels.settings.heatmap-animation`)"
                />
            </div>
        </v-expansion-panel-text>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";

const solarMapStore = useSolarMapStore();

const { mapSettings } = storeToRefs(solarMapStore);

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
