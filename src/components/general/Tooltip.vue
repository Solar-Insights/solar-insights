<template>
    <v-tooltip 
        v-model="displayTooltip" 
        class="tooltip"
        activator="parent"
        rounded
        :open-on-click="true" 
        :open-on-hover="false"
    >
        {{ message }}
    </v-tooltip>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true
    },
    timeout: {
        type: Number
    }
});

const displayTooltip = ref(false);

const DEFAULT_TIMEOUT_MS = 2000;
let closeTimeout: NodeJS.Timeout | undefined;

watch(displayTooltip, () => {
    const timeoutMs = props.timeout === undefined ? DEFAULT_TIMEOUT_MS : props.timeout;

    if (displayTooltip.value === true) {
        clearTimeout(closeTimeout);

        closeTimeout = setTimeout(() => {
            displayTooltip.value = false;
        }, timeoutMs);
    }
});
</script>