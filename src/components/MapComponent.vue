<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

onMounted(async () => {
    const lat: number = parseFloat(useRoute().query["lat"] as string);
    const lng: number = parseFloat(useRoute().query["lng"] as string);
    if (!validCoordinateChecker(lat, lng)) {
        console.log(`the current queries (lat: ${lat}, lng: ${lng}) do not respect the template of coordinates`);
        return router.push({ name: "home" });
    }
    await initMap(lat, lng)
});

async function initMap(lat: number, lng: number): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
    const element = document.getElementById("map") as HTMLElement;
    const options = {
        center: { lat: lat, lng: lng },
        zoom: 21,
        clickableIcons: false,
        disableDoubleClickZoom: false,
        draggable: false,
        isFractionalZoomEnabled: false,
        keyboardShortcuts: false,
        streetViewControl: false,
        mapTypeControl: false
    };

    const map = new Map(element, options);
    /*
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng},
        map,
        title: "Hello World",
    });
    */
    return map;
}

function validCoordinateChecker(lat: number, lng: number) {
    const respectLimits = lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    const notNull = lat != null && lng != null;
    return respectLimits && notNull;
}
</script>