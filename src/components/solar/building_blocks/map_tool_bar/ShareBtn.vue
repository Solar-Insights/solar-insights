<template>
    <v-btn @click="copyRouteToClipboard()" icon>
        <v-icon>mdi-share-outline</v-icon>
        <Tooltip :message="$t(`solar.data-panel.header.toolbar.share-tooltip`)" />
    </v-btn>
</template>

<script setup lang="ts">
import Tooltip from "@/components/general/Tooltip.vue";
import { copyToClipboard } from "@/helpers/util";
import { useSolarMapStore } from "@/stores/solarMapStore";

const solarMapStore = useSolarMapStore();

function copyRouteToClipboard() {
    copyToClipboard(solarMapStore.address);
}
</script>
