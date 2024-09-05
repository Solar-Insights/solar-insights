<template>
    <div>
        <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
            <v-icon class="mr-3">mdi-bullseye-arrow</v-icon>
            <span class="mr-auto"> {{ $t(`solar.data-panel.data-panels.optimizations.name`) }} </span>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
            <div class="detail-text mb-5">
                {{ $t(`solar.data-panel.data-panels.optimizations.description`) }}
            </div>

            <div>
                <ClickableCard
                    :title="$t(`solar.data-panel.data-panels.optimizations.choices.total-savings.name`)"
                    :icon="`mdi-currency-usd`"
                    :paragraph="$t(`solar.data-panel.data-panels.optimizations.choices.total-savings.description`)"
                    @onActionClick="solarMapStore.setOptimizedSavingsConfig"
                />

                <ClickableCard
                    :title="$t(`solar.data-panel.data-panels.optimizations.choices.energy-covered.name`)"
                    :icon="`mdi-home-battery`"
                    :paragraph="$t(`solar.data-panel.data-panels.optimizations.choices.energy-covered.description`)"
                    @onActionClick="solarMapStore.setOptimizedEnergyCoveredConfig"
                />
            </div>
        </v-expansion-panel-text>
    </div>
</template>

<script setup lang="ts">
import { useSolarMapStore } from "@/stores/solarMapStore";
import ClickableCard from "@/components/solar/building_blocks/data_panel/ClickableCard.vue";

const solarMapStore = useSolarMapStore();
</script>
