<template>
    <v-toolbar density="compact">
        <SearchBtn />
        <SaveBtn />
        <ShareBtn />

        <v-spacer />

        <SettingsBtn />
    </v-toolbar>
</template>

<style scoped>
.v-toolbar {
    background-color: var(--v-theme-surface);
}
</style>

<script setup lang="ts">
import SearchBtn from "@/components/solar/building_blocks/map_tool_bar/SearchBtn.vue";
import SaveBtn from "@/components/solar/building_blocks/map_tool_bar/SaveBtn.vue";
import ShareBtn from "@/components/solar/building_blocks/map_tool_bar/ShareBtn.vue";
import SettingsBtn from "@/components/solar/building_blocks/map_tool_bar/SettingsBtn.vue";
</script>
