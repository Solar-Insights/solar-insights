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
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/solar/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";
import { validRouteCoordinates } from "@/helpers/maps/components_util";
import router from "@/router";

const solarMapStore = useSolarMapStore();

const { buildingInsights, centerCoord, solarReadonlyPanel } = storeToRefs(solarMapStore);

onMounted(() => {
    if (!validRouteCoordinates(useRoute().query)) {
        router.push({ name: "search" });
    }
})
</script>
