<template>
    <div class="d-flex">
        <v-card
            id="map-details"
            class="rounded-0"
            :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'"
        >
            <MapHeader :coord="centerCoord" @sync-with-new-request="solarMapStore.syncWithNewRequest" />

            <DataPanel />
        </v-card>

        <map-layers />

        <time-param />

        <div v-if="Object.keys(buildingInsights).length">
            <BuildingReadonlyPanel v-if="solarReadonlyPanel === 'BUILDING_READONLY'" />
            <InsightsReadonlyPanel v-if="solarReadonlyPanel === 'INSIGHTS_READONLY'" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
// Components
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/general/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights, centerCoord, solarReadonlyPanel } = storeToRefs(solarMapStore);
</script>
