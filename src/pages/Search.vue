<template>
    <v-card class="pt-0 body-container">
        <div class="home-title-container">
            <div class="home-title">Find your next solar installation</div>
            <div class="home-title-action mt-12">
                <AutocompleteField :reverseGeocodeOnLoad="false" @sync-with-new-request="sendToMap" />
            </div>
        </div>

        <HelperTimelineSection/>
    </v-card>
</template>

<script setup lang="ts">
import router from "@/router";
import { LatLng } from "geo-env-typing/geo";
import AutocompleteField from "@/components/general/AutocompleteField.vue";
import HelperTimelineSection from "@/components/search/HelperTimelineSection.vue";

function sendToMap(coords: LatLng, address: string) {
    console.log(address);
    console.log(coords);
    router.push({ name: "solar-map", query: coords });
}
</script>
