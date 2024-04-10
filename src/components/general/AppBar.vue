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

            <v-app-bar-nav-icon class="hidden-sm-and-up" variant="text" @click.stop="drawer = !drawer" />

            <v-spacer />

            <v-toolbar-items class="hidden-xs">
                <v-hover v-for="route in routes" v-slot="{ isHovering, props }">
                    <v-btn
                        v-bind="props"
                        class="navbar-btn"
                        :class="isHovering ? 'text-theme' : ''"
                        :ripple="false"
                        :to="{ name: route.routeName }"
                        :active="false"
                    >
                        <template v-slot:prepend>
                            <v-avatar
                                :color="route.routeName === currentRoute.name ? 'theme' : ''"
                                variant="tonal"
                                density="comfortable"
                                size="small"
                                style="border-radius: 8px"
                            >
                                <v-icon>{{ route.icon }}</v-icon>
                            </v-avatar>
                        </template>
                        {{ $t(`navigation.${route.routeName}`) }}
                    </v-btn>
                </v-hover>
            </v-toolbar-items>

            <v-spacer />

            <v-hover v-slot="{ isHovering, props }">
                <v-btn
                    v-bind="props"
                    class="navbar-btn"
                    :class="isHovering ? 'text-theme' : ''"
                    :ripple="false"
                    :active="false"
                >
                    <template v-slot:prepend>
                        <v-avatar
                            variant="tonal"
                            density="comfortable"
                            size="small"
                            style="border-radius: 8px"
                        >
                            <v-icon>mdi-account-outline</v-icon>
                        </v-avatar>
                    </template>
                    
                    <UserMenu />
                </v-btn>
            </v-hover>
            
            <!-- <v-btn @click="login"> Log in </v-btn>
            <v-btn @click="logout"> Log out </v-btn> -->
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" class="hidden-sm-and-up" disable-resize-watcher>
            <v-list>
                <v-list-item v-for="route in routes" :to="{ name: route.routeName }">
                    <template v-slot:prepend>
                        <v-avatar
                            :color="route.routeName === currentRoute.name ? 'theme' : ''"
                            :variant="route.routeName === currentRoute.name ? 'flat' : 'tonal'"
                            density="comfortable"
                            size="small"
                            style="border-radius: 8px"
                        >
                            <v-icon>{{ route.icon }}</v-icon>
                        </v-avatar>
                    </template>
                    {{ $t(`navigation.${route.routeName}`) }}
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuth0 } from '@auth0/auth0-vue';
import UserMenu from "@/components/general/UserMenu.vue";
import logo_nobg from "@/assets/images/logo_nobg.png";

const auth0 = useAuth0();
const currentRoute = useRoute();
const drawer = ref(false);

onMounted(() => {
    console.log(auth0.isAuthenticated.value)
    console.log(auth0.checkSession())
    console.log(auth0.isLoading)
})

watch(auth0.isAuthenticated, () => {
    console.log("auth change", auth0.isAuthenticated.value)
})

const routes = ref([
    {
        routeName: "home",
        icon: "mdi-home-outline"
    },
    {
        routeName: "solar-map",
        icon: "mdi-weather-sunny"
    }
    // {
    //     routeName: "air-quality-map",
    //     icon: "mdi-weather-windy"
    // },
    // {
    //     routeName: "theme",
    //     icon: "mdi-paint"
    // }
]);

function login() {
    auth0.loginWithRedirect();
}

function logout() {
    auth0.logout({ 
        logoutParams: { 
            returnTo: window.location.origin 
        } 
    });
}
</script>
