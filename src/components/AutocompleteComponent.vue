<template>
    <input
        id="autocomplete-input"
        type="text"
        placeholder="Search Box"
        style="width: 100%"
    />
    <v-btn @click="console.log(getGeocoding())"> Enter </v-btn>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
// Objects
import { coordinates } from "@/objects/models";

onMounted(async () => {
    let autocomplete: google.maps.places.Autocomplete = await initAutocomplete();
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
    const input = document.getElementById("autocomplete-input") as HTMLInputElement;
    const geocoder = new google.maps.Geocoder()
    const options = {
        address: input.value,
        language: "fr-CA"
    };
    const geocodingRequest: google.maps.GeocoderResponse = await geocoder.geocode(options);
    return {
        lat: geocodingRequest.results[0].geometry.location.lat(),
        lng: geocodingRequest.results[0].geometry.location.lng()
    };
}
</script>