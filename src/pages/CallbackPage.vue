<template></template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import router from "@/plugins/router";

const userSessionStore = useUserSessionStore();

onMounted(() => {
    const callbackPath = userSessionStore.getAndClearCallbackPath();

    if (callbackPath === "") router.push({ name: "home" });
    else router.push(callbackPath);
});
</script>
