<template>
    <SolarMapPcDisplay v-if="$vuetify.display.mdAndUp" :requestCoordinates="requestCoordinates" />
    <SolarMapMobileDisplay v-if="$vuetify.display.smAndDown" :requestCoordinates="requestCoordinates" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import SolarMapPcDisplay from "@/components/solar/SolarMapPcDisplay.vue";
import SolarMapMobileDisplay from "@/components/solar/SolarMapMobileDisplay.vue";
import { validRouteCoordinates } from "@/helpers/maps/components_util";
import router from "@/router";
import { LatLng, validCoordinates } from "geo-env-typing/geo";

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
