<template>
    <input
        id="autocomplete-input"
        type="text"
        placeholder="Search Box"
        style="width: 100%"
    />
    <v-btn @click="redirectToMap()"> Enter </v-btn>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
// Objects
import { coordinates, validCoordinates } from "@/models/models";
import router from "@/router";

onMounted(async () => {
    await initAutocomplete();
});

async function initAutocomplete(): Promise<google.maps.places.Autocomplete> {
    const { Autocomplete } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const input = document.getElementById("autocomplete-input") as HTMLInputElement;
    const options = {
        componentRestrictions: { country: "ca" },
        fields: ["formatted_address"],
        types: ["address"]
    };
    return new Autocomplete(input, options);
}

async function getGeocoding(): Promise<coordinates> {
    console.log("get lat and lng from address");
    const input = document.getElementById("autocomplete-input") as HTMLInputElement;
    const geocoder = new google.maps.Geocoder()
    const options = {
        address: input.value,
        language: "fr-CA"
    };
    const coord: coordinates = {
        lat: 0,
        lng: 0
    };

    await geocoder.geocode(options)
        .then((geocodingRequest: google.maps.GeocoderResponse) => {
            coord.lat = geocodingRequest.results[0].geometry.location.lat();
            coord.lng = geocodingRequest.results[0].geometry.location.lng();
        })
        .catch((error) => {
            console.log(error);
        })

    return coord;
}

async function redirectToMap() {
    console.log("redirect the user to the right location on the map");
    const coord: coordinates = await getGeocoding();
    if ( coord.lat == 0 && coord.lng == 0) {
        console.log("enter an address");
    }
    else if ( validCoordinates(coord) ) {
        router.push( { name: "map", query: { lat: coord.lat.toString(), lng: coord.lng.toString() } } ) ;
    }
}
</script>