<template>
    <div v-if="!route.requiresAuth || (route.requiresAuth && isAuthenticated)" class="footer-section-item">
        <router-link :to="{ name: route.name }">
            {{ $t(`navigation.${route.name}`) }}
        </router-link>
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
