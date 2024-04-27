<template>
    <v-btn @click="copyRouteToClipboard()" icon>
        <v-icon>mdi-share-outline</v-icon>
        <Tooltip :message="$t(`solar.data-panel.header.toolbar.share-tooltip`)" />
    </v-btn>
</template>

<script setup lang="ts">
import Tooltip from "@/components/general/Tooltip.vue";
import { copyToClipboard } from "@/helpers/util";

function copyRouteToClipboard() {
    const fullCurrentRoute = window.location.href;
    copyToClipboard(fullCurrentRoute);
}
</script>
