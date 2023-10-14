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
import { coordinates, validCoordinates } from "@/models/models";
// Functions
import { initMap, initLabelOnlyMap, initAutocomplete, addMarker, getGeocoding } from "@/plugins/googleMapsAPI";

const autocompleteValue = ref("");

onMounted(async () => {
    const coord: coordinates = { lat: 46.811943, lng: -71.205002 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const parent: HTMLInputElement = document.getElementById("parent-search") as HTMLInputElement;

    const map: google.maps.Map = await initMap(coord, mapElement);
    const labelOnlyMap: google.maps.StyledMapType = initLabelOnlyMap();
    const autocomplete: google.maps.places.Autocomplete = await initAutocomplete();

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(parent);
    map.overlayMapTypes.push(labelOnlyMap as google.maps.MapType);
    addMarker(coord, map);

    autocomplete.addListener("place_changed", async () => {
        const newPlace = autocomplete.getPlace();
        if ( !newPlace || !newPlace.formatted_address ) {
            console.log("User entered the name of a Place that was not suggested and pressed the Enter key, or the Place Details request failed. Display error message");
            return;
        }

        const newCoord = await getNewCoordinates(newPlace.formatted_address);
        if ( !newCoord ) {
            console.log("An error occured when getting the coordinate of the formatted address");
            return;
        }
        map.setCenter( { lat: newCoord.lat, lng: newCoord.lng } );
        addMarker(newCoord, map);
        autocompleteValue.value = newPlace.formatted_address;
    });
});

async function getNewCoordinates(formattedAddress: string) {
    console.log("redirect the user to the right location on the map");
    const coord: coordinates = await getGeocoding(formattedAddress);
    if ( coord.lat == 0 && coord.lng == 0) {
        console.log("enter an address");
    }
    else if ( validCoordinates(coord) ) {
        return coord;
    }
}
</script>