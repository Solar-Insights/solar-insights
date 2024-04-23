<template>
    <div>
        <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
            <v-icon class="mr-3">mdi-solar-power-variant-outline</v-icon>
            <span class="my-auto"> {{ $t(`solar.data-panel.data-panels.panels.name`) }} </span>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
            <div class="detail-text mb-5">
                {{ $t(`solar.data-panel.data-panels.panels.description`) }}
            </div>

            <div>
                <div class="d-flex">
                    <span class="me-auto"> {{ $t(`solar.data-panel.data-panels.panels.count`) }} </span>
                    <span class="text-right">
                        {{
                            buildingInsights.solarPotential === undefined
                                ? 0
                                : buildingInsights.solarPotential.solarPanelConfigs[mapSettings.configIdIndex]
                                        .panelsCount
                        }}
                        / {{ userSolarData.maxPanelCount }}
                        {{ $t(`solar.data-panel.data-panels.panels.panels`) }}
                    </span>
                </div>
                <v-slider
                    v-model="mapSettings.configIdIndex"
                    @end="solarMapStore.panelCountChange"
                    :min="0"
                    :max="
                        buildingInsights.solarPotential === undefined
                            ? 1
                            : buildingInsights.solarPotential.solarPanelConfigs.length - 1
                    "
                    step="1"
                    color="theme"
                />
            </div>

            <div>
                <v-text-field
                    v-model="userSolarData.panelCapacityWatts"
                    :label="$t(`solar.data-panel.data-panels.panels.power-rating`)"
                    density="compact"
                    variant="outlined"
                    type="number"
                    prepend-inner-icon="mdi-lightning-bolt"
                    rounded
                >
                    <template v-slot:append-inner> Watts </template>
                </v-text-field>
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
                    {{ $t(`solar.data-panel.data-panels.panels-advanced-settings.name`) }}
                </v-chip>
            </div>

            <v-expansion-panels v-model="advancedSettingsPanels">
                <v-expansion-panel value="advanced-settings-panels" class="mb-2" elevation="0">
                    <v-expansion-panel-text class="px-0" id="expansion-panel-second-layer">
                        <v-text-field
                            v-model="userSolarData.dcToAcDerate"
                            :label="$t(`solar.data-panel.data-panels.panels-advanced-settings.dc-to-ac`)"
                            density="compact"
                            variant="outlined"
                            type="number"
                            prepend-inner-icon="mdi-handshake"
                            rounded
                        >
                            <template v-slot:append-inner> % </template>
                        </v-text-field>

                        <v-text-field
                            v-model="userSolarData.yearlyPanelEfficiencyDecline"
                            :label="
                                $t(`solar.data-panel.data-panels.panels-advanced-settings.efficiency-decline`)
                            "
                            density="compact"
                            variant="outlined"
                            type="number"
                            prepend-inner-icon="mdi-elevation-decline"
                            rounded
                        >
                            <template v-slot:append-inner> % </template>
                        </v-text-field>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-expansion-panel-text>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";

const solarMapStore = useSolarMapStore();

const { buildingInsights, mapSettings, userSolarData } = storeToRefs(solarMapStore);

const advancedSettingsPanels = ref([] as string[]);
</script>