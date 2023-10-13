<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
// Models
import { coordinates, validCoordinates } from "@/models/models";

var airQualityType = "UAQI_RED_GREEN";

onMounted(async () => {
    const coord: coordinates = getCoordinates();
    const map = await initMap(coord);
    const labelOnlyMap = initLabelOnlyMap();
    const layer = initAirQualityLayer();
    map.overlayMapTypes.push(layer as google.maps.MapType);
    map.overlayMapTypes.push(labelOnlyMap as google.maps.MapType);
});

async function initMap(coord: coordinates): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    return new Map(
        document.getElementById("map") as HTMLElement, 
        {
            mapId: import.meta.env.VITE_AIR_QUALITY_MAP_ID,
            center: { lat: coord.lat, lng: coord.lng },
            zoom: 4,
            minZoom: 1,
            maxZoom: 15,
            clickableIcons: false,
            disableDoubleClickZoom: false,
            isFractionalZoomEnabled: false,
            keyboardShortcuts: false,
            streetViewControl: false,
            mapTypeControl: false,
            restriction: {
                latLngBounds: {north: 85, south: -85, west: -180, east: 180},
                strictBounds: true
            },
        }
    );
}

function initAirQualityLayer() {
    return new google.maps.ImageMapType(
        {
            getTileUrl: function(coord, zoom) {
                if ( coord.x < 0 || coord.y < 0 || zoom < 0 || coord.x >= Math.pow(2, zoom) || coord.y >= Math.pow(2, zoom) ) {
                    return null;
                }
                console.log(1)
                return `https://airquality.googleapis.com/v1/mapTypes/${airQualityType}/heatmapTiles/${zoom}/${coord.x}/${coord.y}?key=${import.meta.env.VITE_GOOGLE_API}`;
            },
            minZoom: 1,
            maxZoom: 15,
            tileSize: new google.maps.Size(256, 256),
            opacity: 0.75
        }
    );
}

function initLabelOnlyMap() {
    return new google.maps.StyledMapType(
        [
            {
                stylers: [{
                    visibility: 'off'
                }]
            }, 
            {
                elementType: 'labels',
                stylers: [
                    { visibility: 'on' },
                    { color: '#55595C' }
                ]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [
                    { color: "#FFFFFF"}
                ]
            },
            {
                featureType: 'road',
                elementType: 'labels',
                stylers: [
                    { visibility: 'off' }
                ]
            }
        ],
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