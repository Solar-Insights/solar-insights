<template>
    <v-app>
        <app-bar/>
        <v-main>
            <v-container class="app-container" fluid>
                <alert/>
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Components
import Alert from "@/components/general/Alert.vue";
import AppBar from "@/components/general/AppBar.vue";
// Style
import { useTheme } from "vuetify";

const theme = useTheme();

</script>
