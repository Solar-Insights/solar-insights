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
import { geocoding } from "@/util/api";

const mockedData = ref();

onMounted(() => {
    geocoding("1233 rue Fenelon, Quebec, Quebec, Canada");
})
</script>