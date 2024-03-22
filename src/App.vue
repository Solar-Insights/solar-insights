<template>
    <v-app :theme="theme">
        <theme-changer />
        <app-bar />
        <v-main>
            <v-btn class="ma-3" @click="$i18n.locale = 'fr'"> Français </v-btn>
            <v-btn class="ma-3" @click="$i18n.locale = 'en'"> English </v-btn>
            <div class="ma-3"> {{ $t("hello") }} </div>
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
import ThemeChanger from "@/components/general/ThemeChanger.vue";

const userSessionStore = useUserSessionStore();

const { theme } = storeToRefs(userSessionStore);
</script>
