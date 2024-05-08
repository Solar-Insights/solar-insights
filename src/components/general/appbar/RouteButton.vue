<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-btn
            v-bind="props"
            class="no-btn-hover-bg"
            :class="isHovering ? 'text-theme' : ''"
            :ripple="false"
            :to="{ name: routeInfo.name }"
            :active="false"
            :disabled="waitForAuthToEnable"
            elevation="0"
        >
            <template v-slot:prepend>
                <v-avatar
                    :color="routeInfo.name === currentRoute.name ? 'theme' : ''"
                    variant="tonal"
                    density="comfortable"
                    size="small"
                    style="border-radius: 8px"
                >
                    <v-icon>{{ routeInfo.icon }}</v-icon>
                </v-avatar>
            </template>
            {{ $t(`navigation.${routeInfo.name}`) }}
        </v-btn>
    </v-hover>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import { PropType } from "vue";
import { RouteInfo } from "@/helpers/types";
import { computed } from "vue";

const props = defineProps({
    routeInfo: {
        type: Object as PropType<RouteInfo>,
        required: true
    }
});

const { isLoading } = useAuth0();

const currentRoute = useRoute();

const waitForAuthToEnable = computed(() => props.routeInfo.requiresAuth && isLoading.value);
</script>
