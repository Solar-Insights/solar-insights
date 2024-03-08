<template>
    <v-app>
        <app-bar/>
        <v-main>
            <v-container class="app-container" fluid>
                <alert-component/>
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Components
import AlertComponent from "@/components/util/AlertComponent.vue";
import AppBar from "@/components/util/AppBar.vue";
// Style
import { useTheme } from "vuetify";

const theme = useTheme();

</script>
