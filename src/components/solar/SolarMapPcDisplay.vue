<template>
    <v-sheet v-if="requestCoordinates !== undefined" class="d-flex">
        <v-col class="pa-0">
            <v-card class="rounded-0 map-details-computer">
                <MapToolBar />

                <MapHeader :requestAddress="requestAddress"/>

                <DataPanel />
            </v-card>
        </v-col>

        <map-layers />

        <time-param />

        <div v-if="Object.keys(buildingInsights).length">
            <BuildingReadonlyPanel v-if="solarReadonlyPanel === 'BUILDING_READONLY'" />
            <InsightsReadonlyPanel v-if="solarReadonlyPanel === 'INSIGHTS_READONLY'" />
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
import { LatLng } from "geo-env-typing/geo";
import { PropType } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import BuildingReadonlyPanel from "@/components/solar/building_blocks/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/building_blocks/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/solar/building_blocks/MapHeader.vue";
import MapLayers from "@/components/solar/building_blocks/MapLayers.vue";
import TimeParam from "@/components/solar/building_blocks/TimeParam.vue";
import DataPanel from "@/components/solar/building_blocks/DataPanel.vue";
import MapToolBar from "@/components/solar/building_blocks/MapToolBar.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights, solarReadonlyPanel } = storeToRefs(solarMapStore);

const props = defineProps({
    requestCoordinates: {
        type: Object as PropType<LatLng>,
        required: true
    },
    requestAddress: {
        type: String,
        required: true
    }
});
</script>
