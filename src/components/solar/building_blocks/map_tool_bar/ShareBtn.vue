<template>
    <v-btn @click="copyRouteToClipboard()" icon>
        <v-icon>mdi-share-outline</v-icon>
        <Tooltip :message="t(`solar.data-panel.header.toolbar.share-tooltip`)" />
    </v-btn>
</template>

<script setup lang="ts">
import Tooltip from "@/components/general/Tooltip.vue";
import { useI18n } from "vue-i18n";
import { copyToClipboard } from "@/helpers/util";

const t = useI18n().t;

function copyRouteToClipboard() {
    const fullCurrentRoute = window.location.href;
    copyToClipboard(fullCurrentRoute);
}
</script>
