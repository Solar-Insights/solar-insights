<template>
    <v-breadcrumbs
        class="pb-0 mx-auto"
        :items="[
            {
                title: $t('navigation.home'),
                disabled: false,
                to: { name: 'home' }
            },
            {
                title: $t('navigation.search-name'),
                disabled: false,
                to: { name: 'search' }
            },
            {
                title: $t(`navigation.solar-map`),
                disabled: true,
                to: { name: 'solar-map' }
            }
        ]"
    />

    <v-card-title class="text-center font-weight-regular">
        <v-icon class="mr-2">mdi-weather-windy</v-icon>
        {{ $t(`navigation.solar-map`) }}
    </v-card-title>

    <AutocompleteField :coord="coord" @sync-with-new-request="solarMapStore.syncWithNewRequest"/>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { LatLng } from "geo-env-typing/geo";
import AutocompleteField from "@/components/general/AutocompleteField.vue";
import { useSolarMapStore } from "@/stores/solarMapStore";

const solarMapStore = useSolarMapStore();

const props = defineProps({
    coord: {
        type: Object as PropType<LatLng>,
        required: true,
        default: {
            lat: 0,
            lng: 0
        }
    }
});
</script>
