<template>
    <v-app :theme="theme">
        <app-bar v-if="route.name !== 'solar-map'" />
        <v-main>
            <v-container class="app-container" fluid>
                <alert v-if="alert !== undefined" />
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useRoute } from "vue-router";
import Alert from "@/components/general/Alert.vue";
import AppBar from "@/components/general/appbar/AppBar.vue";
import { onMounted, watch } from "vue";
import { i18n } from "@/i18n/i18n";
import { useAuth0 } from "@auth0/auth0-vue";

const auth0 = useAuth0();
const route = useRoute();
const userSessionStore = useUserSessionStore();
const { theme, locale, alert } = storeToRefs(userSessionStore);

onMounted(async () => {
    i18n.global.locale.value = locale.value;
});

watch(auth0.isLoading, async () => {
    if (auth0.isLoading.value) return;

    await auth0
        .getAccessTokenSilently()
        .then((accessToken) => {
            userSessionStore.accessToken = accessToken;
        })
        .catch((error) => {
            userSessionStore.accessToken = "";
        });
});
</script>
