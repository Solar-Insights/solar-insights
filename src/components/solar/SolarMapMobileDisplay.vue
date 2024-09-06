<template>
    <v-sheet>
        <MapToolBar />

        <div class="d-flex">
            <v-col class="pa-0">
                <v-card class="rounded-0 map-details-mobile" :width="displayingData ? '100vw' : '0'">
                    <MapHeader />

                    <DataPanel />
                </v-card>
            </v-col>

            <MapLayers />

            <TimeParam v-if="!displayingData" />

            <div>
                <BuildingReadonlyPanel v-if="solarReadonlyPanel === 'BUILDING_READONLY'" />
                <InsightsReadonlyPanel v-if="solarReadonlyPanel === 'INSIGHTS_READONLY'" />
            </div>
        </div>

        <MobileBottomNav
            :showingData="displayingData"
            @showData="
                displayingData = true;
                solarMapStore.setReadonlyPanelToDisplay(undefined);
            "
            :showingMap="solarReadonlyPanel === undefined && displayingData === false"
            @showMap="
                displayingData = false;
                solarMapStore.setReadonlyPanelToDisplay(undefined);
            "
            :showingSolarInsights="solarReadonlyPanel === 'INSIGHTS_READONLY'"
            @showSolarInsights="
                displayingData = false;
                solarMapStore.setReadonlyPanelToDisplay('INSIGHTS_READONLY');
            "
            :showingBuildingAttributes="solarReadonlyPanel === 'BUILDING_READONLY'"
            @showBuildingAttributes="
                displayingData = false;
                solarMapStore.setReadonlyPanelToDisplay('BUILDING_READONLY');
            "
        />
    </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import BuildingReadonlyPanel from "@/components/solar/building_blocks/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/building_blocks/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/solar/building_blocks/MapHeader.vue";
import MapLayers from "@/components/solar/building_blocks/MapLayers.vue";
import TimeParam from "@/components/solar/building_blocks/TimeParam.vue";
import DataPanel from "@/components/solar/building_blocks/DataPanel.vue";
import MapToolBar from "@/components/solar/building_blocks/MapToolBar.vue";
import MobileBottomNav from "@/components/solar/building_blocks/mobile/MobileBottomNav.vue";

onMounted(() => {
    solarMapStore.setReadonlyPanelToDisplay("INSIGHTS_READONLY");
});

const solarMapStore = useSolarMapStore();

const { solarReadonlyPanel } = storeToRefs(solarMapStore);

const displayingData = ref(false);
</script>
