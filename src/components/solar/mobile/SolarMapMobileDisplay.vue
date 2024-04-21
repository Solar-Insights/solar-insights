<template>
    <div v-if="requestCoordinates !== undefined" class="d-flex w-100">
        <MobileAppBar 
            :showingMap="displayedInfo === MAP"
            @showMap="displayedInfo = MAP;"

            :showingData="displayedInfo === DATA"
            @showData="displayedInfo = DATA;"

            :showingSolarInsights="solarReadonlyPanel === 'INSIGHTS_READONLY'"
            @showSolarInsights="solarMapStore.selectReadonlyPanelToDisplay('INSIGHTS_READONLY')"
            
            :showingBuildingAttributes="solarReadonlyPanel === 'BUILDING_READONLY'"
            @showBuildingAttributes="solarMapStore.selectReadonlyPanelToDisplay('BUILDING_READONLY')"
        />

        <v-col class="pa-0" cols="12">
            <v-card
                :width="displayedInfo === DATA ? '100%' : '0'"
                :height="displayedInfo === DATA ? '100%' : '0'"
                permanent
            >
                <v-card
                    id="map-details"
                    class="rounded-0 map-details-mobile"
                >
                    <MapHeader :coord="requestCoordinates" />

                    <DataPanel />
                </v-card>
            </v-card>

            <map-layers :showMap="displayedInfo === MAP"/>

            <time-param />

            <div v-if="Object.keys(buildingInsights).length && displayedInfo === MAP">
                <BuildingReadonlyPanel v-if="solarReadonlyPanel === 'BUILDING_READONLY'" />
                <InsightsReadonlyPanel v-if="solarReadonlyPanel === 'INSIGHTS_READONLY'" />
            </div>
        </v-col>
    </div>
</template>

<script setup lang="ts">
import { LatLng } from 'geo-env-typing/geo';
import { PropType, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MobileAppBar from '@/components/solar/mobile/MobileAppBar.vue';
import MapHeader from "@/components/solar/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights, solarReadonlyPanel } = storeToRefs(solarMapStore);

const props = defineProps({
    requestCoordinates: {
        type: Object as PropType<LatLng>
    }
});

const MAP = 0;
const DATA = 1;
const displayedInfo = ref(MAP);
</script>