<template>
    <div class="page-section-title-container">
        <v-card-title class="page-section-title">
            {{ pageSectionDescriptorTitle }}
        </v-card-title>

        <v-card-subtitle class="page-section-subtitle">
            {{ pageSectionDescriptorSubtitle }}
        </v-card-subtitle>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    pageSectionDescriptorTitle: {
        type: String,
        required: true
    },
    pageSectionDescriptorSubtitle: {
        type: String,
        required: true
    }
});
</script>