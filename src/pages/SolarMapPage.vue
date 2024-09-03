<template>
    <SolarMapPcDisplay v-if="$vuetify.display.mdAndUp"/>
    <SolarMapMobileDisplay v-if="$vuetify.display.smAndDown"/>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SolarMapPcDisplay from "@/components/solar/SolarMapPcDisplay.vue";
import SolarMapMobileDisplay from "@/components/solar/SolarMapMobileDisplay.vue";
import { LatLng, validCoordinates } from "geo-env-typing/geo";
import { useHead } from "unhead";
import { headSelector, SOLAR_MAP } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useSolarMapStore } from "@/stores/solarMapStore"

const router = useRouter();
const userSessionStore = useUserSessionStore();
const solarMapStore = useSolarMapStore();

useHead(headSelector(SOLAR_MAP, userSessionStore.locale));

const route = useRoute();

onMounted(async () => {
    const coords: LatLng = {
        lat: Number(route.query.lat),
        lng: Number(route.query.lng)
    };
    
    if (!validCoordinates(coords) || !solarMapStore.buildingQueried) {
        router.push({ name: "search" });
    }

    solarMapStore.buildingQueried = false;
});
</script>
