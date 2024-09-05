<template>
    <div>
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
                            :label="$t(`solar.data-panel.data-panels.costs-advanced-settings.energy-cost-increase`)"
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

                        <ClickableCard
                            :title="$t(`solar.data-panel.data-panels.costs-advanced-settings.reset-financial-parameters`)"
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
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import ClickableCard from "@/components/solar/building_blocks/data_panel/ClickableCard.vue";

const solarMapStore = useSolarMapStore();

const { userSolarData } = storeToRefs(solarMapStore);

const advancedSettingsSolarPotential = ref([] as string[]);
</script>
