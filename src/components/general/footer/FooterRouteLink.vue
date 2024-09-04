<template>
    <div v-if="!route.requiresAuth || (route.requiresAuth && isAuthenticated)" class="footer-section-item">
        <router-link v-if="!route.action" :to="{ name: route.name }">
            {{ $t(`navigation.${route.name}`) }}
        </router-link>

        <a v-else href="#" :onclick="route.action">
            {{ $t(`navigation.${route.name}`) }}
        </a>
    </div>
</template>

<script setup lang="ts">
import { RouteInfo } from "@/helpers/types";
import { PropType } from "vue";

const props = defineProps({
    route: {
        type: Object as PropType<RouteInfo>,
        required: true
    },
    isAuthenticated: {
        type: Boolean,
        required: true
    }
});
</script>
