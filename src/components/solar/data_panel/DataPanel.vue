<template>
    <div :class="$vuetify.display.smAndDown ? 'map-data-mobile' : 'map-data-computer'">
        <ReadonlyPanelSelector/>

        <v-expansion-panels variant="accordion" v-model="expansionPanels">
            <v-expansion-panel elevation="0" value="panels">
                <ExpansionPanels/>
            </v-expansion-panel>

            <v-expansion-panel elevation="0" panel="costs">
                <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                    <v-icon class="mr-3">mdi-cash</v-icon>
                    <span class="my-auto"> {{ $t(`solar.data-panel.data-panels.costs.name`) }} </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <div class="detail-text mb-5">
                        {{ $t(`solar.data-panel.data-panels.costs.description`) }}
                    </div>

                    <div>
                        <v-text-field
                            v-model="userSolarData.averageMonthlyEnergyBill"
                            :label="$t(`solar.data-panel.data-panels.costs.monthly-energy-cost`)"
                            density="compact"
                            variant="outlined"
                            type="number"
                            prepend-inner-icon="mdi-calendar-month-outline"
                            rounded
                        >
                            <template v-slot:append-inner> $ </template>
                        </v-text-field>
                        <v-text-field
                            v-model="userSolarData.energyCostPerKwh"
                            :label="$t(`solar.data-panel.data-panels.costs.energy-cost`)"
                            density="compact"
                            variant="outlined"
                            type="number"
                            prepend-inner-icon="mdi-currency-usd"
                            rounded
                        >
                            <template v-slot:append-inner> $ </template>
                        </v-text-field>
                        <v-text-field
                            v-model="userSolarData.installationCostPerWatt"
                            :label="$t(`solar.data-panel.data-panels.costs.installation-cost`)"
                            density="compact"
                            variant="outlined"
                            type="number"
                            prepend-inner-icon="mdi-hammer"
                            rounded
                        >
                            <template v-slot:append-inner> $ </template>
                        </v-text-field>
                        <v-text-field
                            v-model="userSolarData.solarIncentives"
                            :label="$t(`solar.data-panel.data-panels.costs.solar-incentives`)"
                            density="compact"
                            variant="outlined"
                            type="number"
                            prepend-inner-icon="mdi-handshake"
                            rounded
                        >
                            <template v-slot:append-inner> $ </template>
                        </v-text-field>
                    </div>

                    <div class="w-100 text-center mb-2">
                        <v-chip
                            @click="
                                advancedSettingsSolarPotential.length == 0
                                    ? (advancedSettingsSolarPotential = ['advanced-settings-solar-potential'])
                                    : (advancedSettingsSolarPotential = [])
                            "
                            color="theme"
                            variant="text"
                            :append-icon="advancedSettingsSolarPotential.length == 0 ? 'mdi-menu-down' : 'mdi-menu-up'"
                        >
                            {{ $t(`solar.data-panel.data-panels.costs-advanced-settings.name`) }}
                        </v-chip>
                    </div>

                    <v-expansion-panels v-model="advancedSettingsSolarPotential">
                        <v-expansion-panel value="advanced-settings-solar-potential" class="mb-2" elevation="0">
                            <v-expansion-panel-text class="px-0" id="expansion-panel-second-layer">
                                <v-text-field
                                    v-model="userSolarData.yearlyEnergyCostIncrease"
                                    :label="
                                        $t(`solar.data-panel.data-panels.costs-advanced-settings.energy-cost-increase`)
                                    "
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                    prepend-inner-icon="mdi-chart-line-variant"
                                    rounded
                                >
                                    <template v-slot:append-inner> % </template>
                                </v-text-field>

                                <v-text-field
                                    v-model="userSolarData.yearlyDiscountRate"
                                    :label="$t(`solar.data-panel.data-panels.costs-advanced-settings.discount-rate`)"
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                    prepend-inner-icon="mdi-cart-percent"
                                    rounded
                                >
                                    <template v-slot:append-inner> % </template>
                                </v-text-field>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel elevation="0" value="optimization">
                <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                    <v-icon class="mr-3">mdi-bullseye-arrow</v-icon>
                    <span class="mr-auto"> {{ $t(`solar.data-panel.data-panels.optimizations.name`) }} </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <div class="detail-text mb-5">
                        {{ $t(`solar.data-panel.data-panels.optimizations.description`) }}
                    </div>

                    <div>
                        <v-card
                            @click="solarMapStore.setOptimizedSavingsConfig"
                            class="optimization-card"
                            variant="outlined"
                        >
                            <v-card-item class="pt-0 px-0" prepend-icon="mdi-currency-usd">
                                {{ $t(`solar.data-panel.data-panels.optimizations.choices.total-savings.name`) }}
                            </v-card-item>
                            <v-card-item class="pa-0 pr-2 detail-text" prepend-icon="null">
                                {{ $t(`solar.data-panel.data-panels.optimizations.choices.total-savings.description`) }}
                            </v-card-item>
                        </v-card>
                        <v-card
                            @click="solarMapStore.setOptimizedEnergyCoveredConfig"
                            class="optimization-card"
                            variant="outlined"
                        >
                            <v-card-item class="pt-0 px-0" prepend-icon="mdi-home-battery">
                                {{ $t(`solar.data-panel.data-panels.optimizations.choices.energy-covered.name`) }}
                            </v-card-item>
                            <v-card-item class="pa-0 pr-2 detail-text" prepend-icon="null">
                                {{
                                    $t(`solar.data-panel.data-panels.optimizations.choices.energy-covered.description`)
                                }}
                            </v-card-item>
                        </v-card>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel elevation="0" value="settings">
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
                        >
                            <template v-slot:label>
                                <span class="ml-4">
                                    {{ $t(`solar.data-panel.data-panels.settings.display-panels`) }}
                                </span>
                            </template>
                        </v-switch>

                        <v-switch
                            v-model="mapSettings.showHeatmap"
                            @change="changeLayersOnShowHeatmapChange"
                            inset
                            color="theme"
                            density="compact"
                        >
                            <template v-slot:label>
                                <span class="ml-4">
                                    {{ $t(`solar.data-panel.data-panels.settings.display-heatmap`) }}
                                </span>
                            </template>
                        </v-switch>

                        <v-switch
                            v-model="mapSettings.heatmapAnimation"
                            inset
                            color="theme"
                            density="compact"
                            :disabled="
                                !mapSettings.showHeatmap ||
                                !['monthlyFlux', 'hourlyShade'].includes(mapSettings.layerId)
                            "
                        >
                            <template v-slot:label>
                                <span class="ml-4">
                                    {{ $t(`solar.data-panel.data-panels.settings.heatmap-animation`) }}
                                </span>
                            </template>
                        </v-switch>
                    </div>
                </v-expansion-panel-text>
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
