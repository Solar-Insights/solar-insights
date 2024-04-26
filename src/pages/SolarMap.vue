<template>
    <SolarMapPcDisplay v-if="$vuetify.display.mdAndUp" :requestCoordinates="requestCoordinates" :requestAddress="requestAddress"/>
    <SolarMapMobileDisplay v-if="$vuetify.display.smAndDown" :requestCoordinates="requestCoordinates" :requestAddress="requestAddress"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import SolarMapPcDisplay from "@/components/solar/SolarMapPcDisplay.vue";
import SolarMapMobileDisplay from "@/components/solar/SolarMapMobileDisplay.vue";
import { validRouteCoordinates } from "@/helpers/solar/map/components_util";
import router from "@/router";
import { LatLng, validCoordinates } from "geo-env-typing/geo";
import { getReverseGeocoding } from "@/api/geo";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { useI18n } from "vue-i18n";

const route = useRoute();
const solarMapStore = useSolarMapStore();
const t = useI18n().t;

const requestAddress = ref<string>("");
const requestCoordinates = ref<LatLng>({
    lat: Number(useRoute().query.lat),
    lng: Number(useRoute().query.lng)
});

onMounted(async () => {
    if (!validRouteCoordinates(route.query) || !validCoordinates(requestCoordinates.value)) {
        router.push({ name: "search" });
    }

    requestAddress.value = await getReverseGeocoding(requestCoordinates.value)
            .then((address: string) => {
                solarMapStore.syncWithNewRequest(requestCoordinates.value, requestAddress.value);
                return address;
            })
            .catch((error) => {
                return t(`solar.data-panel.header.reverse-geocoding-error`);
            });
});
</script>
