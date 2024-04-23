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
    </div>
</template>

<script setup lang="ts">
import { useSolarMapStore } from "@/stores/solarMapStore";

const solarMapStore = useSolarMapStore();
</script>