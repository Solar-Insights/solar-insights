<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
// Functions
import { getSolarData } from "@/plugins/solarAPI";
import { coordinates, validCoordinates } from "@/models/models";

onMounted(async () => {
    const coord: coordinates = {
        lat: parseFloat(useRoute().query["lat"] as string),
        lng: parseFloat(useRoute().query["lng"] as string)
    }
    if (!validCoordinates(coord)) {
        return router.push({ name: "home" });
    }
    
    await initMap(coord);3
    const solarData = await getSolarData(coord);
});

async function initMap(coord: coordinates): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
    const element = document.getElementById("map") as HTMLElement;
    const options = {
        center: { lat: coord.lat, lng: coord.lng },
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
</script>