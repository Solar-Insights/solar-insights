<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-btn
            v-bind="props"
            class="no-btn-hover-bg"
            :class="isHovering ? 'text-theme' : ''"
            :ripple="false"
            :to="{ name: routeName }"
            :active="false"
            :disabled="requiresAuth && isLoading"
            elevation="0"
        >
            <template v-slot:prepend>
                <v-avatar
                    :color="routeName === currentRoute.name ? 'theme' : ''"
                    variant="tonal"
                    density="comfortable"
                    size="small"
                    style="border-radius: 8px"
                >
                    <v-icon>{{ icon }}</v-icon>
                </v-avatar>
            </template>
            {{ $t(`navigation.${routeName}`) }}
        </v-btn>
    </v-hover>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";

const { isLoading } = useAuth0();

const currentRoute = useRoute();

const props = defineProps({
    routeName: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    requiresAuth: {
        type: Boolean,
        required: true
    }
});
</script>
