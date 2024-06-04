<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card :class="theme === 'dark' ? 'dark-app-menu-container' : 'light-app-menu-container'" elevation="20">
            <slot></slot>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";

const userSessionStore = useUserSessionStore();

const { theme } = storeToRefs(userSessionStore);
</script>