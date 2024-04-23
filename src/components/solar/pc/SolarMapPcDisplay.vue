<template>
    <div v-if="requestCoordinates !== undefined" class="d-flex">
        <v-col class="pa-0">
            <v-card id="map-details" class="rounded-0 map-details-computer">
                <MapHeader :coord="requestCoordinates" />

                <DataPanel />
            </v-card>
        </v-col>

        <map-layers />

        <time-param />

        <div v-if="Object.keys(buildingInsights).length">
            <BuildingReadonlyPanel v-if="solarReadonlyPanel === 'BUILDING_READONLY'" />
            <InsightsReadonlyPanel v-if="solarReadonlyPanel === 'INSIGHTS_READONLY'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { LatLng } from "geo-env-typing/geo";
import { PropType } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/solar/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/data_panel/DataPanel.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights, solarReadonlyPanel } = storeToRefs(solarMapStore);

const props = defineProps({
    requestCoordinates: {
        type: Object as PropType<LatLng>
    }
});
</script>
