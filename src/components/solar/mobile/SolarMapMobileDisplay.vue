<template>
    <div>
        <MobileAppBar
            :showingData="displayingData"
            @showData="solarMapStore.removeReadonlyPanelSelection(); displayingData = !displayingData;"

            :showingSolarInsights="solarReadonlyPanel === 'INSIGHTS_READONLY'"
            @showSolarInsights="displayingData = false; solarMapStore.selectReadonlyPanelToDisplay('INSIGHTS_READONLY')"
            
            :showingBuildingAttributes="solarReadonlyPanel === 'BUILDING_READONLY'"
            @showBuildingAttributes="displayingData = false; solarMapStore.selectReadonlyPanelToDisplay('BUILDING_READONLY')"
        />
    
        <div v-if="requestCoordinates !== undefined" class="d-flex w-100">
            <v-col class="pa-0" cols="12">
                <v-card
                    :width="displayingData ? '100%' : '0'"
                    :height="displayingData ? '100%' : '0'"
                >
                    <v-card
                        id="map-details"
                        class="rounded-0 map-details-mobile"
                    >
                        <MapHeader :coord="requestCoordinates" />

                        <DataPanel />
                    </v-card>
                </v-card>

                <map-layers :showMap="displayingData === false"/>

                <time-param />

                <div v-if="Object.keys(buildingInsights).length && displayingData === false">
                    <BuildingReadonlyPanel v-if="solarReadonlyPanel === 'BUILDING_READONLY'" />
                    <InsightsReadonlyPanel v-if="solarReadonlyPanel === 'INSIGHTS_READONLY'" />
                </div>
            </v-col>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LatLng } from 'geo-env-typing/geo';
import { onMounted, PropType, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MobileAppBar from '@/components/solar/mobile/MobileAppBar.vue';
import MapHeader from "@/components/solar/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";

onMounted(() => {
    solarMapStore.removeReadonlyPanelSelection();
    solarMapStore.selectReadonlyPanelToDisplay('INSIGHTS_READONLY');
})

const solarMapStore = useSolarMapStore();

const { buildingInsights, solarReadonlyPanel } = storeToRefs(solarMapStore);

const props = defineProps({
    requestCoordinates: {
        type: Object as PropType<LatLng>
    }
});

const displayingData = ref(false);
</script>