<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
    <div id="parent-search" class="w-100"> 
        <v-text-field
            v-model="autocompleteValue"
            id="autocomplete-search"
            class="bg-white ml-6 my-6 rounded-xl w-50"
            placeholder="Find a location"
            prepend-inner-icon="mdi-magnify"
            hide-details
            single-line
            solo
        />
    </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref } from "vue";
// Models
import { coordinates } from "@/models/models";
// Functions
import { initMap, initLabelOnlyMap, initAutocomplete, addMarker, getCoordinatesFromAddress, getAirQualityData } from "@/plugins/googleMapsAPI";

// Refs
const autocompleteValue = ref("");

// Google components
let map: google.maps.Map;
let marker: google.maps.Marker;
let infoWindow: google.maps.InfoWindow;
let labelOnlyMap: google.maps.StyledMapType;
let autocomplete: google.maps.places.Autocomplete;;

onMounted(async () => {
    // Setup values
    const coord: coordinates = { lat: 46.811943, lng: -71.205002 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const parent: HTMLInputElement = document.getElementById("parent-search") as HTMLInputElement;

    // Init values of google components
    map = await initMap(coord, mapElement);
    marker = addMarker(coord, map);
    labelOnlyMap = initLabelOnlyMap();
    autocomplete = await initAutocomplete("autocomplete-search");

    // Add map overlay and autocomplete on map + Perform first air quality fetch
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(parent);
    map.overlayMapTypes.push(labelOnlyMap as google.maps.MapType);
    await getAirQualityData(coord);

    // Listener for the autocomplete component - Get new place -> Display new position -> Replace marker -> Get air quality data
    autocomplete.addListener("place_changed", async () => {
        const newPlace = autocomplete.getPlace();
        if ( !newPlace || !newPlace.formatted_address ) {
            console.log("User entered the name of a Place that was not suggested and pressed the Enter key, or the Place Details request failed. Display error message");
            return;
        }

        const newCoord = await getCoordinatesFromAddress(newPlace.formatted_address);
        if ( !newCoord ) {
            console.log("An error occured when getting the coordinate of the formatted address");
            return;
        }
        map.setCenter( { lat: newCoord.lat, lng: newCoord.lng } );
        marker.setMap(null);
        marker = addMarker(newCoord, map);
        await getAirQualityData(newCoord);
    });
});
</script>