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
import { onMounted } from "vue";
import { i18n } from "@/plugins/i18n/i18n";

const route = useRoute();
const userSessionStore = useUserSessionStore();
const { theme, locale, alert } = storeToRefs(userSessionStore);

onMounted(async () => {
    i18n.global.locale.value = locale.value;
});
</script>
