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

            <div class="w-100 text-center mb-2">
                <v-chip
                    @click="
                        advancedSettingsPanels.length == 0
                            ? (advancedSettingsPanels = ['advanced-settings-panels'])
                            : (advancedSettingsPanels = [])
                    "
                    color="theme"
                    variant="text"
                    :append-icon="advancedSettingsPanels.length == 0 ? 'mdi-menu-down' : 'mdi-menu-up'"
                >
                    {{ $t(`solar.data-panel.data-panels.settings-advanced-settings.name`) }}
                </v-chip>
            </div>

            <v-expansion-panels v-model="advancedSettingsPanels">
                <v-expansion-panel value="advanced-settings-panels" class="mb-2" elevation="0">
                    <v-expansion-panel-text class="px-0" id="expansion-panel-second-layer">
                        <ClickableCard
                            :title="$t(`solar.data-panel.data-panels.settings-advanced-settings.reset-map-parameters`)"
                            :icon="`mdi-home`"
                            :isButton="true"
                            @onActionClick=""
                        />
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-expansion-panel-text>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import ClickableCard from "@/components/solar/building_blocks/data_panel/ClickableCard.vue";

const solarMapStore = useSolarMapStore();

const { mapSettings } = storeToRefs(solarMapStore);

const advancedSettingsPanels = ref([] as string[]);

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
