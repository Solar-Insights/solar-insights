<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
// Functions
import { getSolarData, getSolarLayers, getSingleSolarLayer, getSingleSolarLayerUrl } from "@/plugins/solarAPI";
import { coordinates, validCoordinates, solarData, solarLayers } from "@/models/models";
// Map
import 'leaflet/dist/leaflet.css';
import "leaflet-geotiff";

onMounted(async () => {
    const coord: coordinates = {
        lat: parseFloat(useRoute().query["lat"] as string),
        lng: parseFloat(useRoute().query["lng"] as string)
    }
    if (!validCoordinates(coord)) {
        return router.push({ name: "home" });
    }

    const map = await initMap(coord);
    const solarData: solarData = await getSolarData(coord);
    const solarLayers: solarLayers = await getSolarLayers(coord);
    const annualFluxUrl = getSingleSolarLayerUrl(solarLayers.annualFluxUrl);
});

async function initMap(coord: coordinates): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
    const element = document.getElementById("map") as HTMLElement;
    const options = {
        center: { lat: coord.lat, lng: coord.lng },
        zoom: 18,
        clickableIcons: false,
        disableDoubleClickZoom: false,
        draggable: false,
        isFractionalZoomEnabled: false,
        keyboardShortcuts: false,
        streetViewControl: false,
        mapTypeControl: false,
    };

    const map = new Map(element, options);
    return map;
}
</script>