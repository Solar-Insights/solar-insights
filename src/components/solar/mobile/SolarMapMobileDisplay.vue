<template>
    <div v-if="requestCoordinates !== undefined" class="d-flex w-100">
        <MobileAppBar 
            :showingMap="displayedInfo === MAP"
            @showMap="displayedInfo = MAP;"

            :showingData="displayedInfo === DATA"
            @showData="displayedInfo = DATA;"

            :showingSolarInsights="displayedInfo === SOLAR_INSIGHTS"
            @showSolarInsights="displayedInfo = SOLAR_INSIGHTS;"
            
            :showingBuildingAttributes="displayedInfo === BUILDING_ATTRIBUTES"
            @showBuildingAttributes="displayedInfo = BUILDING_ATTRIBUTES;"
        />

        <v-col class="pa-0" cols="12">
            <v-card
                :width="displayedInfo === DATA ? '100%' : '0'"
                :height="displayedInfo === DATA ? '100%' : '0'"
                permanent
            >
                <v-card
                    id="map-details"
                    class="rounded-0 map-details-mobile"
                >
                    <MapHeader :coord="requestCoordinates" />

                    <DataPanel />
                </v-card>
            </v-card>

            <map-layers :showMap="displayedInfo === MAP"/>

            <time-param />
        </v-col>
    </div>
</template>

<script setup lang="ts">
import { LatLng } from 'geo-env-typing/geo';
import { PropType, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useSolarMapStore } from "@/stores/solarMapStore";
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MobileAppBar from '@/components/solar/mobile/MobileAppBar.vue';
import MapHeader from "@/components/solar/MapHeader.vue";
import MapLayers from "@/components/solar/MapLayers.vue";
import TimeParam from "@/components/solar/TimeParam.vue";
import DataPanel from "@/components/solar/DataPanel.vue";

const solarMapStore = useSolarMapStore();

const { buildingInsights } = storeToRefs(solarMapStore);

const props = defineProps({
    requestCoordinates: {
        type: Object as PropType<LatLng>
    }
});

const displayedInfo = ref(0);

const MAP = 0;
const DATA = 1;
const SOLAR_INSIGHTS = 2;
const BUILDING_ATTRIBUTES = 3;
</script>