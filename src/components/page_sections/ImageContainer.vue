<template>
    <v-img 
        class="hidden-xs pc-image-container"
        :src="props.pcImageSrc"
        :max-width="props.maxWidth"
        :min-width="props.minWidth"
        :max-height="props.maxHeight"
        :min-height="props.minHeight"
    />
    <v-img 
        class="hidden-sm-and-up mobile-image-container"
        :src="props.mobileImageSrc"
        :max-width="props.maxWidth"
        :min-width="props.minWidth"
        :max-height="props.maxHeight"
        :min-height="props.minHeight"
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
    maxWidth: {
        type: Number,
        required: false
    },
    maxHeight: {
        type: Number,
        required: false
    },
    minWidth: {
        type: Number,
        required: false
    },
    minHeight: {
        type: Number,
        required: false
    }
});
</script>