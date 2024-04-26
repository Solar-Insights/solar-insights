<template>
    <v-btn icon>
        <v-icon>mdi-share</v-icon>
        <Tooltip :message="t(`solar.data-panel.header.toolbar.share-tooltip`)"/>
    </v-btn>
</template>

<script setup lang="ts">
import Tooltip from '@/components/general/Tooltip.vue';
import { useI18n } from 'vue-i18n';

const t = useI18n().t;
</script>