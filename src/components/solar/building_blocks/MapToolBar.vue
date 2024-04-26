<template>
        <v-toolbar density="compact">
            <SearchBtn/>

            <v-btn icon>
                <v-icon>mdi-file-document-plus-outline</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-code-json</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-share</v-icon>
            </v-btn>

            <v-spacer />

            <SettingsBtn />
        </v-toolbar>
</template>

 <style scoped>
    .v-toolbar {
        background-color: var(--v-theme-surface)
    }
</style>

<script setup lang="ts">
import SearchBtn from '@/components/solar/building_blocks/map_tool_bar/SearchBtn.vue';
import SettingsBtn from '@/components/solar/building_blocks/map_tool_bar/SettingsBtn.vue';
</script>