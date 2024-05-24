<template>
    <v-sheet class="form-dialog-section-container">
        <div class="form-dialog-section-title">{{ props.sectionTitle }}</div>
        <slot></slot>
    </v-sheet>
</template>

<script setup lang="ts">
const props = defineProps({
    sectionTitle: {
        type: String,
        required: true
    }
});
</script>
