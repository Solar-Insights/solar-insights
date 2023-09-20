<template>
    <h1> Home </h1>
    <input
      id="pac-input"
      type="text"
      placeholder="Search Box"
    />

    <div id="map" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";

  onMounted(async () => {
  let map: google.maps.Map;
  async function initMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 46.81700897216797, lng: -71.36833190917969 },
      zoom: 8,
    });

    const input = document.getElementById("pac-input") as HTMLInputElement;
    const options = {
      componentRestrictions: { country: "ca" },
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options)
  }

  initMap();
});





</script>