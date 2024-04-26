<template>
    <v-sheet>
        <v-toolbar density="compact">
            <v-btn icon :to="{ name: 'search' }">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

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

            <v-btn icon>
                <v-icon>mdi-cog-outline</v-icon>
                <SettingsMenu />
            </v-btn>
        </v-toolbar>
    </v-sheet>
</template>

<style scoped>
    .v-toolbar {
        background-color: var(--v-theme-surface)
    }
</style>

<script setup lang="ts">
import SettingsMenu from '@/components/general/appbar/SettingsMenu.vue';
</script>