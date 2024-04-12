<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-btn
            v-bind="props"
            class="navbar-btn"
            :class="isHovering ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            :disabled="auth0.isLoading.value"
        >
            <template v-slot:prepend>
                <v-avatar variant="tonal" density="comfortable" size="small" style="border-radius: 8px">
                    <v-icon>{{ icon }}</v-icon>
                </v-avatar>
            </template>
            <span v-if="isMobile"> {{ $t(`navigation.${menu}`) }} </span>

            <UserMenu v-if="menu === 'user'" />
            <SettingsMenu v-else-if="menu === 'settings'" />
        </v-btn>
    </v-hover>
</template>

<script setup lang="ts">
import UserMenu from "@/components/general/appbar/UserMenu.vue";
import SettingsMenu from "@/components/general/appbar/SettingsMenu.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const auth0 = useAuth0();

const props = defineProps({
    menu: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    isMobile: {
        type: Boolean,
        required: true
    }
});
</script>
