<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
    <div id="parent-search" class="w-100"> 
        <AutocompleteComponent/>
    </div>
    
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
// Models
import { coordinates, validCoordinates } from "@/models/models";
// Components
import AutocompleteComponent from "@/components/AutocompleteComponent.vue";

onMounted(async () => {
    const coord: coordinates = getCoordinates();
    const mapElement = document.getElementById("map") as HTMLElement;
    const map = await initMap(coord, mapElement);

    const parent = document.getElementById("parent-search") as HTMLInputElement;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(parent);
    
    const labelOnlyMap = initLabelOnlyMap();
    map.overlayMapTypes.push(labelOnlyMap as google.maps.MapType);
});

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

async function initMap(coord: coordinates, mapElement: HTMLElement): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    return new Map(
        mapElement,
        {
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            center: { lat: coord.lat, lng: coord.lng },
            zoom: 15,
            minZoom: 15,
            maxZoom: 15,
            clickableIcons: false,
            disableDoubleClickZoom: false,
            isFractionalZoomEnabled: false,
            keyboardShortcuts: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            scrollwheel: false,
            rotateControl: false,
            restriction: {
                latLngBounds:{
                    north: 85.0, 
                    south: -60.0, 
                    west: -179.0, 
                    east: 179.0
                },
                strictBounds : true
            }
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
                featureType: 'administrative',
                elementType: 'labels',
                stylers: [
                    { visibility: 'on' },
                    { color: '#55595C' }
                ]
            },
            {
                featureType: 'administrative',
                elementType: 'labels.text.stroke',
                stylers: [
                    { color: "#FFFFFF"}
                ]
            }
        ],
    );
}
</script>