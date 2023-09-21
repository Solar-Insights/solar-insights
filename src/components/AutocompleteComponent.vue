<template>
    <input
      id="pac-input"
      type="text"
      placeholder="Search Box"
      style="width: 100%"
    />
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";

onMounted(async () => {
    let autocomplete: google.maps.places.Autocomplete = await initAutocomplete();
});

async function initAutocomplete(): Promise<google.maps.places.Autocomplete> {
    const { Autocomplete } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const options = {
        componentRestrictions: { country: "ca" },
        fields: ["formatted_address"],
        types: ["address"]
    };
    return new Autocomplete(input, options);
}

</script>