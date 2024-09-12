<template>
    <div>
        <v-app-bar density="comfortable" elevation="0">
            <v-btn
                class="px-2 h-100 ml-2"
                :to="{ name: 'home' }"
                style="font-size: 1.1rem"
                :active="false"
                :ripple="false"
                variant="plain"
            >
                <v-avatar class="mr-2 hidden-md-and-up" icon="mdi-home" density="compact" />
                <span class="hidden-sm-and-down"> SOLAR INSIGHTS </span>
            </v-btn>

            <v-spacer />

            <v-app-bar-nav-icon class="hidden-sm-and-up" variant="text" @click.stop="drawer = !drawer" />

            <v-toolbar-items class="hidden-xs" v-for="route in appBarRoutes">
                <AppBarButton
                    :icon="route.icon"
                    :requiresAuth="route.requiresAuth"
                    :text="route.name"
                    :currentRoute="route.name === currentRoute.name"
                    @sendAction="router.push({ name: route.name })"
                />
            </v-toolbar-items>

            <v-spacer class="hidden-xs" />

            <v-toolbar-items class="hidden-xs">
                <AppBarButton
                    :icon="menus[`user`].icon"
                    :requiresAuth="false"
                    :text="menus[`user`].name"
                    :hideText="true"
                    @sendAction=""
                >
                    <UserMenu />
                </AppBarButton>

                <AppBarButton
                    :icon="menus[`settings`].icon"
                    :requiresAuth="false"
                    :text="menus[`settings`].name"
                    :hideText="true"
                    @sendAction=""
                >
                    <SettingsMenu />
                </AppBarButton>
            </v-toolbar-items>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" class="hidden-sm-and-up" disable-resize-watcher>
            <v-list>
                <v-list-item v-for="route in appBarRoutes">
                    <AppBarButton
                        :icon="route.icon"
                        :requiresAuth="route.requiresAuth"
                        :text="route.name"
                        :currentRoute="route.name === currentRoute.name"
                        @sendAction="router.push({ name: route.name })"
                    />
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <v-list>
                    <v-list-item>
                        <AppBarButton
                            :icon="menus[`user`].icon"
                            :requiresAuth="false"
                            :text="menus[`user`].name"
                            :hideText="false"
                            @sendAction=""
                        >
                            <UserMenu />
                        </AppBarButton>
                    </v-list-item>

                    <v-list-item>
                        <AppBarButton
                            :icon="menus[`settings`].icon"
                            :requiresAuth="false"
                            :text="menus[`settings`].name"
                            :hideText="false"
                            @sendAction=""
                        >
                            <SettingsMenu />
                        </AppBarButton>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppBarButton from "@/components/general/appbar/AppBarButton.vue";
import UserMenu from "@/components/general/appbar/UserMenu.vue";
import SettingsMenu from "@/components/general/appbar/SettingsMenu.vue";
import logo_nobg from "@/assets/images/general/logo_nobg.webp";
import { routes, menus } from "@/helpers/constants";
import { RouteInfo } from "@/helpers/types";
import { useRoute, useRouter } from "vue-router";

const currentRoute = useRoute();
const router = useRouter();

const drawer = ref(false);

const appBarRouteNames = ["get-started", "pricing", "search"];
const appBarRoutes = ref<RouteInfo[]>(routes.filter((route) => appBarRouteNames.includes(route.name)));
</script>
