<template>
    <v-card class="pt-0 body-container text-center">
        <v-card-title class="pa-0 mb-3">
            <div class="text-h1 my-6">{{ $t(`catch-all.oops`) }}</div>
            <div class="text-h3 my-6">{{ $t(`catch-all.404`) }}</div>
        </v-card-title>

        <v-card-text class="pa-0 mb-6">
            {{ $t(`catch-all.message`) }}
        </v-card-text>

        <v-card-actions class="justify-center" style="flex-wrap: wrap">
            <v-btn :to="{ name: 'home' }" class="px-4 mx-4 my-3" color="theme" variant="flat" size="large" rounded>
                {{ $t(`catch-all.home-button`) }}
            </v-btn>

            <v-btn @click="router.back()" class="px-4 mx-4 my-3" color="theme" variant="flat" size="large" rounded>
                {{ $t(`catch-all.back-button`) }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import router from "@/router";
</script>
