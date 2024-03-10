<template>
    <div class="d-flex">
        <v-card
            id="map-details"
            class="rounded-0"
            :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'"
        >
            <map-header :coord="centerCoord" @sync-with-new-request="solarMapStore.syncWithNewRequest" />

            <data-panel
                @show-building-readonly-panel="solarReadonlyPanel = 0"
                @show-insights-readonly-panel="solarReadonlyPanel = 1"
            />
        </v-card>

        <map-layers />

        <time-param />

        <div v-if="Object.keys(buildingInsights).length">
            <BuildingReadonlyPanel v-if="solarReadonlyPanel == 0" />
            <InsightsReadonlyPanel v-if="solarReadonlyPanel == 1" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
// Components
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/general/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights, centerCoord } = storeToRefs(solarMapStore);

const solarReadonlyPanel = ref(0);
</script>
