<template>
    <div>
        <v-breadcrumbs
            class="pb-0 justify-center"
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

        <v-card-title class="text-center font-weight-regular my-3">
            <v-icon class="mr-2">mdi-weather-windy</v-icon>
            {{ $t(`navigation.solar-map`) }}
        </v-card-title>

        <v-card-subtitle class="text-center font-weight-regular title-break">
            {{ requestAddress }}
        </v-card-subtitle>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    requestAddress: {
        type: String,
        required: true
    }
});

</script>
