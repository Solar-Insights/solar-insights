<template>
    <v-btn
        @click="userSessionStore.changeTheme()"
        class="ma-2"
        style="z-index: 9999; position: fixed; top: 0; left: 0"
        :icon="theme === 'light' ? 'mdi-lightbulb-on-outline' : 'mdi-lightbulb-on'"
        elevation="0"
        size="small"
    ></v-btn>
</template>

<script setup lang="ts">
// Vue
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";

const userSessionStore = useUserSessionStore();
const { theme } = storeToRefs(userSessionStore);
</script>
