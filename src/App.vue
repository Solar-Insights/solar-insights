<template>
    <v-app :theme="theme">
        <AppBar v-if="displaysAppComponents" />
        <v-main>
            <v-container class="app-container" fluid>
                <Alert v-if="alert !== undefined" />
                <router-view :key="currentRoute.fullPath"></router-view>
            </v-container>
        </v-main>
        <AppFooter v-if="displaysAppComponents"/>
    </v-app>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useRoute } from "vue-router";
import Alert from "@/components/general/Alert.vue";
import AppBar from "@/components/general/appbar/AppBar.vue";
import AppFooter from "@/components/general/footer/AppFooter.vue";
import { computed, onMounted } from "vue";
import { i18n } from "@/plugins/i18n/i18n";

const currentRoute = useRoute();
const userSessionStore = useUserSessionStore();
const { theme, locale, alert } = storeToRefs(userSessionStore);

const routesWithNoAppComponents = ["solar-map"]

const displaysAppComponents = computed(() => {
    const currentRouteName: any = currentRoute.name;
    return !routesWithNoAppComponents.includes(currentRouteName);
})

onMounted(async () => {
    i18n.global.locale.value = locale.value;
});
</script>
