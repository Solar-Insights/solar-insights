<template>
    <v-container>
        <h1> Test page </h1>
        <div>
            {{ mockedData }}
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getReverseGeocoding } from "@/util/server";

const mockedData = ref();

onMounted(async () => {
    await getReverseGeocoding({lat: 46.81701, lng: -71.36838});
})
</script>