<template>
    <v-app :theme="theme">
        <theme-changer />
        <app-bar />
        <v-main>
            <v-container class="app-container" fluid>
                <alert />
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Vue
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
// Components
import Alert from "@/components/general/Alert.vue";
import AppBar from "@/components/general/AppBar.vue";
import ThemeChanger from "@/components/general/QuickSettings.vue";

const userSessionStore = useUserSessionStore();

const { theme } = storeToRefs(userSessionStore);
</script>
