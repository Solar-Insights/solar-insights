<template>
    <div v-if="requestCoordinates !== undefined" class="d-flex">
        <v-card
            id="map-details"
            class="rounded-0"
            :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'"
        >
            <MapHeader :coord="requestCoordinates" />

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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/solar/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";
import { validRouteCoordinates } from "@/helpers/maps/components_util";
import router from "@/router";
import { LatLng, validCoordinates } from "geo-env-typing/geo";

const solarMapStore = useSolarMapStore();

const { buildingInsights, solarReadonlyPanel } = storeToRefs(solarMapStore);

const requestCoordinates = ref<LatLng>();

onMounted(() => {
    const route = useRoute();
    const coordinates: LatLng = {
        lat: Number(route.query.lat),
        lng: Number(route.query.lng)
    };

    if (!validRouteCoordinates(route.query) || !validCoordinates(coordinates)) {
        router.push({ name: "search" });
    }

    requestCoordinates.value = coordinates;
});
</script>
