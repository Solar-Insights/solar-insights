<template>
    <v-app>
        <v-main>
            <v-container class="app-container" fluid>
                <AlertComponent />
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Components
import AlertComponent from "@/components/util/AlertComponent.vue";
</script>
