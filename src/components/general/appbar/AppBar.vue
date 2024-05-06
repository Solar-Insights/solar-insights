<template>
    <div>
        <v-app-bar density="comfortable" elevation="0" scroll-behavior="hide" scroll-threshold="1">
            <v-btn
                class="px-2 h-100 ml-0 no-background-hover"
                :to="{ name: 'home' }"
                style="font-size: 1.1rem"
                :active="false"
                :ripple="false"
                variant="plain"
            >
                <v-avatar class="mr-2" :image="logo_nobg" density="compact" />
                SOLAR INSIGHTS
            </v-btn>

            <v-spacer />

            <v-app-bar-nav-icon class="hidden-sm-and-up" variant="text" @click.stop="drawer = !drawer" />

            <v-toolbar-items class="hidden-xs">
                <RouteButton v-for="route in routes" :routeInfo="route" />
            </v-toolbar-items>

            <v-spacer class="hidden-xs" />

            <v-toolbar-items class="hidden-xs">
                <MenuButton v-for="menu in menus" :menu="menu.menuName" :icon="menu.icon" :isMobile="false" />
            </v-toolbar-items>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" class="hidden-sm-and-up" disable-resize-watcher>
            <v-list>
                <v-list-item v-for="route in routes">
                    <RouteButton :routeInfo="route" />
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <v-list>
                    <v-list-item v-for="menu in menus">
                        <MenuButton :menu="menu.menuName" :icon="menu.icon" :isMobile="true" />
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RouteButton from "@/components/general/appbar/RouteButton.vue";
import MenuButton from "@/components/general/appbar/MenuButton.vue";
import logo_nobg from "@/assets/images/general/logo_nobg.png";
import { RouteInfo } from "@/helpers/types";

const drawer = ref(false);

const routes = ref<RouteInfo[]>([
    {
        name: "home",
        icon: "mdi-home-outline",
        requiresAuth: false
    },
    {
        name: "search",
        icon: "mdi-weather-sunny",
        requiresAuth: false
    },
    {
        name: "my-organization",
        icon: "mdi-account-group-outline",
        requiresAuth: true
    },
]);

const menus = ref([
    {
        menuName: "user",
        icon: "mdi-account-outline"
    },
    {
        menuName: "settings",
        icon: "mdi-cog-outline"
    }
]);
</script>
