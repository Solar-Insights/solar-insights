<template></template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import router from "@/router/router";
import { UserLoginSuccess, UserLogoutSuccess } from "@/helpers/alerts/success";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { useHead } from "unhead";
import { CALLBACK } from "@/router/routes";

useHead({
    title: CALLBACK.en.head.title,
    meta: CALLBACK.en.head.meta,
});

const userSessionStore = useUserSessionStore();

onMounted(() => {
    if (userJustLoggedIn(router.currentRoute.value)) {
        useUserSessionStore().setAlert(new UserLoginSuccess());
    } else if (userJustLoggedOut(router.currentRoute.value)) {
        useUserSessionStore().setAlert(new UserLogoutSuccess());
    }

    const callbackPath = userSessionStore.getAndClearCallbackPath();
    if (callbackPath === "") router.push({ name: "home" });
    else router.push(callbackPath);
});

function userJustLoggedIn(route: RouteLocationNormalizedLoaded) {
    return router.currentRoute.value.query.code !== undefined && router.currentRoute.value.query.state !== undefined;
}

function userJustLoggedOut(route: RouteLocationNormalizedLoaded) {
    return router.currentRoute.value.query.logout !== undefined;
}
</script>
