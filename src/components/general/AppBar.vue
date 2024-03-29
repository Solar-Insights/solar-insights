<template>
    <div>
        <v-app-bar 
            density="comfortable"
            elevation="2"
        >
            <v-img
                :src="logo_nobg"
                class="mx-2"
                max-height="30"
                max-width="30"
                contain
            />
        
            <v-app-bar-nav-icon class="hidden-sm-and-up" variant="text" @click.stop="drawer = !drawer" />

            <v-spacer />

            <v-toolbar-items class="hidden-xs">
                <v-btn v-for="route in routes" :to="{ name: route.routeName }">
                    {{ $t(`navigation.${route.routeName}`) }}
                </v-btn>
            </v-toolbar-items>

            <v-spacer />

            <QuickSettings />
        </v-app-bar >

        <v-navigation-drawer v-model="drawer" class="hidden-sm-and-up" disable-resize-watcher>
            <v-list>
                <v-list-item v-for="route in routes" :to="{ name: route.routeName }" :prepend-icon="route.icon">
                    {{ $t(`navigation.${route.routeName}`) }}
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
import QuickSettings from "@/components/general/QuickSettings.vue";
import logo_nobg from "@/assets/images/logo_nobg.png";

const drawer = ref(false);

const routes = ref([
    {
        routeName: "home",
        icon: "mdi-home"
    },
    {
        routeName: "solar-map",
        icon: "mdi-weather-sunny"
    },
    // {
    //     routeName: "air-quality-map",
    //     icon: "mdi-weather-windy"
    // },
    // {
    //     routeName: "theme",
    //     icon: "mdi-paint"
    // }
]);
</script>
