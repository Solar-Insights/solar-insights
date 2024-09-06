<template>
    <div id="map" class="w-100"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
import { initMapComponents } from "@/helpers/solar/map/components_util";
import { useSolarMapVisualsStore } from "@/stores/solarMapVisualsStore";

const solarMapStore = useSolarMapStore();
const solarMapVisualsStore = useSolarMapVisualsStore();

const { centerCoord } = storeToRefs(solarMapStore);
const { map } = storeToRefs(solarMapVisualsStore);

onMounted(async () => {
    const mapComponents = await initMapComponents(centerCoord.value);
    map.value = mapComponents.map;

    await solarMapVisualsStore.syncMapOnLoad(
        solarMapStore.mapSettings,
        solarMapStore.buildingInsights,
        solarMapStore.centerCoord
    );
    await solarMapStore.syncMapOnLoad();
});
</script>
