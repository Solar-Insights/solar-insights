<template>
    <div class="d-flex" style="height: 100vh">
        <v-card
            id="map-details"
            class="rounded-0"
            :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'"
        >
            <map-header :coord="centerCoord" @sync-with-new-request="airMapStore.syncWithNewRequest" />

            <data-panel />
        </v-card>

        <div id="map" class="w-100"></div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted } from "vue";
import _ from "lodash";
import { useAirMapStore } from "@/stores/airMapStore";
import { storeToRefs } from "pinia";
import { initMapComponents } from "@/helpers/util";
// Components
import MapHeader from "@/components/general/MapHeader.vue";
import DataPanel from "@/components/air_quality/DataPanel.vue";

const airMapStore = useAirMapStore();

const { map, marker, centerCoord } = storeToRefs(airMapStore);

onMounted(async () => {
    const mapComponents = await initMapComponents(centerCoord.value, "AIR_QUALITY");
    map.value = mapComponents.map;
    marker.value = mapComponents.marker;
});
</script>
