<template>
    <div v-if="requestCoordinates !== undefined" class="d-flex">
        <v-col class="pa-0" cols="12">
            <v-app-bar elevation="0">
                <v-spacer/>

                <v-hover v-slot="{ isHovering, props }">
                    <v-btn
                        @click="mobileDrawer = !mobileDrawer"
                        v-bind="props"
                        class="navbar-btn"
                        :class="mobileDrawer ? 'text-theme' : ''"
                        :ripple="false"
                        :active="false"
                        elevation="0"
                    >
                        <template v-slot:prepend>
                            <v-avatar variant="tonal" density="comfortable" size="small" style="border-radius: 8px">
                                <v-icon>mdi-pencil</v-icon>
                            </v-avatar>
                        </template>
                    </v-btn>
                </v-hover>

                <v-spacer/>
            </v-app-bar>

            <v-navigation-drawer 
                v-model="mobileDrawer"
                class="w-100"
            >
                <v-card
                    id="map-details"
                    class="rounded-0 map-details-mobile"
                >
                    <MapHeader :coord="requestCoordinates" />

                    <DataPanel />
                </v-card>
            </v-navigation-drawer>
        </v-col>

        <map-layers/>
        
        <time-param />

        <div v-if="Object.keys(buildingInsights).length">
            <BuildingReadonlyPanel v-if="solarReadonlyPanel === 'BUILDING_READONLY'" />
            <InsightsReadonlyPanel v-if="solarReadonlyPanel === 'INSIGHTS_READONLY'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { LatLng } from 'geo-env-typing/geo';
import { PropType, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/solar/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights, solarReadonlyPanel } = storeToRefs(solarMapStore);

const mobileDrawer = ref(true);

const props = defineProps({
    requestCoordinates: {
        type: Object as PropType<LatLng>
    }
});

</script>