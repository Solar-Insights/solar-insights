<template>
    <div id="map" class="w-100"></div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
// Helpers
import { initMapComponents } from "@/helpers/util";

const solarMapStore = useSolarMapStore();

const { map, centerCoord } = storeToRefs(solarMapStore);

onMounted(async () => {
    const mapComponents = await initMapComponents(centerCoord.value, "SOLAR");
    map.value = mapComponents.map;
});
</script>
