<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-btn
            v-bind="props"
            class="navbar-btn"
            :class="isHovering ? 'text-theme' : ''"
            :ripple="false"
            :to="{ name: routeName }"
            :active="false"
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

const currentRoute = useRoute();

const props = defineProps({
    routeName: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});
</script>
