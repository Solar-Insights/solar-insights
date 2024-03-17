<template>
    <div :class="$vuetify.display.xs ? 'map-data-mobile' : 'map-data-computer'">
        <div class="mb-4">
            <v-btn
                @click="solarMapStore.selectReadonlyPanelToDisplay('BUILDING_READONLY')"
                class="panel-selection-btn"
                :class="solarReadonlyPanel === 'BUILDING_READONLY' ? 'bg-theme-darker-3' : 'bg-theme'"
                :prepend-icon="solarReadonlyPanel === 'BUILDING_READONLY' ? 'mdi-home' : 'mdi-home-outline'"
                :ripple="false"
            >
                Building
            </v-btn>
            <v-btn
                @click="solarMapStore.selectReadonlyPanelToDisplay('INSIGHTS_READONLY')"
                class="panel-selection-btn"
                :class="solarReadonlyPanel === 'INSIGHTS_READONLY' ? 'bg-theme-darker-3' : 'bg-theme'"
                :prepend-icon="solarReadonlyPanel === 'INSIGHTS_READONLY' ? 'mdi-flash' : 'mdi-flash-outline'"
                :ripple="false"
            >
                Insights
            </v-btn>
        </div>

        <v-expansion-panels variant="accordion">
            <v-expansion-panel elevation="0">
                <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                    <v-icon class="mr-3">mdi-solar-power-variant-outline</v-icon> <span class="my-auto"> Panels </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <div class="detail-text mb-3">
                        Solar panels are ordered from most to least efficient based annual sunlight of the roof (e.g. an
                        input of 10 panels will use the 10 most efficient)
                    </div>

                    <div>
                        <div class="d-flex">
                            <span class="me-auto"> Count </span>
                            <span class="text-right">
                                {{
                                    buildingInsights.solarPotential === undefined
                                        ? 0
                                        : buildingInsights.solarPotential.solarPanelConfigs[mapSettings.configIdIndex]
                                              .panelsCount
                                }}
                                / {{ userSolarData.maxPanelCount }} panels
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
                            label="Power rating (capacity)"
                            density="compact"
                            variant="outlined"
                            class="map-input-field"
                            type="number"
                            prepend-inner-icon="mdi-lightning-bolt"
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
                            Advanced Settings
                        </v-chip>
                    </div>

                    <v-expansion-panels v-model="advancedSettingsPanels">
                        <v-expansion-panel value="advanced-settings-panels" class="mb-2" elevation="0">
                            <v-expansion-panel-text class="px-0" id="expansion-panel-second-layer">
                                <v-text-field
                                    v-model="userSolarData.dcToAcDerate"
                                    label="DC to AC conversion"
                                    density="compact"
                                    variant="outlined"
                                    class="map-input-field"
                                    type="number"
                                    prepend-inner-icon="mdi-handshake"
                                >
                                    <template v-slot:append-inner> % </template>
                                </v-text-field>

                                <v-text-field
                                    v-model="userSolarData.yearlyPanelEfficiencyDecline"
                                    label="Panel efficiency decline per year"
                                    density="compact"
                                    variant="outlined"
                                    class="map-input-field"
                                    type="number"
                                    prepend-inner-icon="mdi-elevation-decline"
                                >
                                    <template v-slot:append-inner> % </template>
                                </v-text-field>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel elevation="0">
                <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                    <v-icon class="mr-3">mdi-cash</v-icon> <span class="my-auto"> Costs and Incentives </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <div class="detail-text mb-3">
                        Costs and incentives are used to evaluate the financial benefits of solar panels for a specific
                        building
                    </div>

                    <div>
                        <v-text-field
                            v-model="userSolarData.averageMonthlyEnergyBill"
                            label="Average monthly energy cost"
                            density="compact"
                            variant="outlined"
                            class="map-input-field"
                            type="number"
                            prepend-inner-icon="mdi-calendar-month-outline"
                        >
                            <template v-slot:append-inner> $ </template>
                        </v-text-field>
                        <v-text-field
                            v-model="userSolarData.energyCostPerKwh"
                            label="Energy cost per kWh"
                            density="compact"
                            variant="outlined"
                            class="map-input-field"
                            type="number"
                            prepend-inner-icon="mdi-currency-usd"
                        >
                            <template v-slot:append-inner> $ </template>
                        </v-text-field>
                        <v-text-field
                            v-model="userSolarData.installationCostPerWatt"
                            label="Installation cost per Watt"
                            density="compact"
                            variant="outlined"
                            class="map-input-field"
                            type="number"
                            prepend-inner-icon="mdi-hammer"
                        >
                            <template v-slot:append-inner> $ </template>
                        </v-text-field>
                        <v-text-field
                            v-model="userSolarData.solarIncentives"
                            label="Solar incentives"
                            density="compact"
                            variant="outlined"
                            class="map-input-field"
                            type="number"
                            prepend-inner-icon="mdi-handshake"
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
                            Advanced Settings
                        </v-chip>
                    </div>

                    <v-expansion-panels v-model="advancedSettingsSolarPotential">
                        <v-expansion-panel value="advanced-settings-solar-potential" class="mb-2" elevation="0">
                            <v-expansion-panel-text class="px-0" id="expansion-panel-second-layer">
                                <v-text-field
                                    v-model="userSolarData.yearlyEnergyCostIncrease"
                                    label="Energy cost increase per year"
                                    density="compact"
                                    variant="outlined"
                                    class="map-input-field"
                                    type="number"
                                    prepend-inner-icon="mdi-chart-line-variant"
                                >
                                    <template v-slot:append-inner> % </template>
                                </v-text-field>

                                <v-text-field
                                    v-model="userSolarData.yearlyDiscountRate"
                                    label="Discount rate per year"
                                    density="compact"
                                    variant="outlined"
                                    class="map-input-field"
                                    type="number"
                                    prepend-inner-icon="mdi-cart-percent"
                                >
                                    <template v-slot:append-inner> % </template>
                                </v-text-field>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel elevation="0">
                <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                    <v-icon class="mr-3">mdi-cog-outline</v-icon> <span class="my-auto"> Settings </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <div class="detail-text mb-3">
                        Settings to control what information is currently being displayed on the map
                    </div>

                    <div>
                        <v-select
                            v-model="mapSettings.layerId"
                            @update:modelValue="showDataLayerOnLayerIdChange"
                            item-title="displayedName"
                            item-value="name"
                            :items="mapSettings.layerIdChoices"
                            label="Displayed solar data"
                            density="compact"
                            variant="outlined"
                            class="map-input-field"
                            prepend-inner-icon="mdi-magnify"
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
                                <span class="ml-4"> Display panels </span>
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
                                <span class="ml-4"> Display heatmap </span>
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
                                <span class="ml-4"> Heatmap animation </span>
                            </template>
                        </v-switch>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";

const solarMapStore = useSolarMapStore();

const { buildingInsights, mapSettings, userSolarData, solarReadonlyPanel } = storeToRefs(solarMapStore);

const advancedSettingsPanels = ref([] as string[]);
const advancedSettingsSolarPotential = ref([] as string[]);

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
