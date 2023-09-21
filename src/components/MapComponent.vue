<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";

onMounted(async () => {
    let map: google.maps.Map = await initMap();
});

async function initMap(): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const element = document.getElementById("map") as HTMLElement;
    const options = {
        center: { lat: 46.81700897216797, lng: -71.36833190917969 },
        zoom: 8
    };
    return new Map(element, options);
}
</script>