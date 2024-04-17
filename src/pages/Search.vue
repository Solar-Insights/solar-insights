<template>
    <v-btn @click="sendToMap({ lat: 46.81700274623237, lng: -71.36837761987567 })"> Fetch </v-btn>
</template>

<script setup lang="ts">
import router from '@/router';
import { LatLng } from 'geo-env-typing/geo';


function sendToMap(coordinates: LatLng) {
    router.push({ name: "solar-map", query: coordinates });
}
</script>
