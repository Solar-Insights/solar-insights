<template>
    <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
// Models
import { coordinates, validCoordinates } from "@/models/models";


var airQualityType = "UAQI_INDIGO_PERSIAN";


onMounted(async () => {
    const coord: coordinates = getCoordinates();
    const map = await initMap(coord);
    const layer = await initAirQualityLayer();
    map.overlayMapTypes.push(layer as google.maps.MapType);
});

async function initMap(coord: coordinates): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    return new Map(
        document.getElementById("map") as HTMLElement, 
        {
            mapId: import.meta.env.VITE_AIR_QUALITY_MAP_ID,
            center: { lat: coord.lat, lng: coord.lng },
            zoom: 4,
            minZoom: 3,
            maxZoom: 6,
            clickableIcons: false,
            disableDoubleClickZoom: false,
            isFractionalZoomEnabled: false,
            keyboardShortcuts: false,
            streetViewControl: false,
            mapTypeControl: false
        }
    );
}

async function initAirQualityLayer() {
    return new google.maps.ImageMapType(
        {
            getTileUrl: function(coord, zoom) {
                var airQualityUrl = `https://airquality.googleapis.com/v1/mapTypes/${airQualityType}/heatmapTiles/${zoom}/${coord.x}/${coord.y}?key=${import.meta.env.VITE_GOOGLE_API}`;
                return airQualityUrl;
            },
            minZoom: 3,
            maxZoom: 6,
            tileSize: new google.maps.Size(256, 256),
            opacity: 0.75
        }
    );
}

function getCoordinates() {
    const coord: coordinates = {
        lat: parseFloat(useRoute().query["lat"] as string),
        lng: parseFloat(useRoute().query["lng"] as string)
    };

    if (!validCoordinates(coord)) {
        router.push({ name: "home" });
        coord.lat = 0, coord.lng = 0;
    }
    return coord;
}
</script>