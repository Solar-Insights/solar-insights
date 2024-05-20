<template>
    <v-img 
        class="hidden-xs pc-image-container"
        :src="props.pcImageSrc"
    />
    <v-img 
        class="hidden-sm-and-up mobile-image-container"
        :src="props.mobileImageSrc"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    pcImageSrc: {
        type: String,
        required: true
    },
    mobileImageSrc: {
        type: String,
        required: true
    },
});
</script>