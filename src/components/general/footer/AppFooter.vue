<template>
    <div class="footer">
        <v-divider />
        <AppFooterSitemap />
        <v-divider />

        <AppFooterCommercial />
    </div>
</template>

<script setup lang="ts">
import AppFooterSitemap from "@/components/general/footer/AppFooterSitemap.vue";
import AppFooterCommercial from "@/components/general/footer/AppFooterCommercial.vue";
</script>
