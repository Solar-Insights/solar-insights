<template>
    <div
        id="map" 
        class="w-100"
    ></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
import { initMapComponents } from "@/helpers/maps/components_util";

const solarMapStore = useSolarMapStore();

const { map, centerCoord } = storeToRefs(solarMapStore);

onMounted(async () => {
    const mapComponents = await initMapComponents(centerCoord.value);
    map.value = mapComponents.map;
});
</script>
