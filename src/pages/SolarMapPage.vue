<template>
    <div v-if="verificationsFinished">
        <SolarMapPcDisplay v-if="$vuetify.display.mdAndUp" />
        <SolarMapMobileDisplay v-if="$vuetify.display.smAndDown" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SolarMapPcDisplay from "@/components/solar/SolarMapPcDisplay.vue";
import SolarMapMobileDisplay from "@/components/solar/SolarMapMobileDisplay.vue";
import { LatLng, validCoordinates } from "geo-env-typing/geo";
import { useHead } from "unhead";
import { headSelector, SOLAR_MAP } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { SEARCH } from "@/router/routes";
import { useSolarMapVisualsStore } from "@/stores/solarMapVisualsStore";

const router = useRouter();
const route = useRoute();
const userSessionStore = useUserSessionStore();
const solarMapStore = useSolarMapStore();
const solarMapVisualsStore = useSolarMapVisualsStore();

useHead(headSelector(SOLAR_MAP, userSessionStore.locale));

const verificationsFinished = ref<Boolean>(false);

onMounted(async () => {
    const coords: LatLng = {
        lat: Number(route.query.lat),
        lng: Number(route.query.lng)
    };

    if (!validCoordinates(coords) || !validateBuildingQueried(coords)) {
        return router.push({ name: SEARCH.en.name });
    }

    solarMapStore.setDefaultParametersAndSettings();
    solarMapVisualsStore.setDefaultParametersAndSettings();

    verificationsFinished.value = true;
});

function validateBuildingQueried(currentCoords: LatLng) {
    const previouslyQueriedCoords = userSessionStore.buildingQueried.coords;
    if (!userSessionStore.buildingQueried.validRequest || !validCoordinates(previouslyQueriedCoords)) {
        return false;
    }

    const sameCoords =
        previouslyQueriedCoords.lat === currentCoords.lat && previouslyQueriedCoords.lng === currentCoords.lng;
    if (!sameCoords) {
        return false;
    }

    return true;
}
</script>
