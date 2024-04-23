<template>
    <div class="mb-4 hidden-sm-and-down">
        <v-hover v-slot="{ isHovering, props }">
            <v-btn
                v-bind="props"
                @click="solarMapStore.selectReadonlyPanelToDisplay('INSIGHTS_READONLY')"
                class="navbar-btn panel-selection-btn"
                :class="isHovering || solarMapStore.solarReadonlyPanel === 'INSIGHTS_READONLY' ? 'text-theme' : ''"
                :ripple="false"
                :active="false"
                elevation="0"
                rounded
            >
                <template v-slot:prepend>
                    <v-avatar
                        :color="solarMapStore.solarReadonlyPanel === 'INSIGHTS_READONLY' ? 'theme' : ''"
                        variant="tonal"
                        density="comfortable"
                        size="small"
                        style="border-radius: 8px"
                    >
                        <v-icon>mdi-flash-outline</v-icon>
                    </v-avatar>
                </template>
                {{ $t(`solar.data-panel.readonly-panels.insights`) }}
            </v-btn>
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
            <v-btn
                v-bind="props"
                @click="solarMapStore.selectReadonlyPanelToDisplay('BUILDING_READONLY')"
                class="navbar-btn panel-selection-btn"
                :class="isHovering || solarMapStore.solarReadonlyPanel === 'BUILDING_READONLY'  ? 'text-theme' : ''"
                :ripple="false"
                :active="false"
                elevation="0"
                rounded
            >
                <template v-slot:prepend>
                    <v-avatar
                        :color="solarMapStore.solarReadonlyPanel === 'BUILDING_READONLY' ? 'theme' : ''"
                        variant="tonal"
                        density="comfortable"
                        size="small"
                        style="border-radius: 8px"
                    >
                        <v-icon>mdi-home-outline</v-icon>
                    </v-avatar>
                </template>
                {{ $t(`solar.data-panel.readonly-panels.building`) }}
            </v-btn>
        </v-hover>
    </div>
</template>

<script setup lang="ts">
import { useSolarMapStore } from "@/stores/solarMapStore";

const solarMapStore = useSolarMapStore();
</script>