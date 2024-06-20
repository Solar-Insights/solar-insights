<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-btn
            v-bind="props"
            @click="emits(`sendAction`)"
            class="no-btn-hover-bg"
            :class="isHovering ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            :disabled="waitForAuthToEnable"
            elevation="0"
        >
            <template v-slot:prepend>
                <v-avatar
                    :color="currentRoute ? 'theme' : ''"
                    variant="tonal"
                    density="comfortable"
                    size="small"
                    style="border-radius: 8px"
                >
                    <v-icon>{{ icon }}</v-icon>
                </v-avatar>
            </template>
            <span v-if="stringHasValue($props.text) && !hideText"> {{ $t(`navigation.${$props.text}`) }} </span>
            <slot></slot>
        </v-btn>
    </v-hover>
</template>

<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { computed } from "vue";
import { stringHasValue } from "@/helpers/componentConditionals";

const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    requiresAuth: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    currentRoute: {
        type: Boolean,
        default: false,
        required: false
    },
    hideText: {
        type: Boolean,
        default: false,
        required: false
    }
});

const emits = defineEmits(["sendAction"]);

const { isLoading } = useAuth0();

const waitForAuthToEnable = computed(() => props.requiresAuth && isLoading.value);
</script>
