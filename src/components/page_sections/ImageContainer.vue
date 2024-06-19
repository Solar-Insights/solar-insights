<template>
    <v-img
        class="hidden-xs pc-image-container"
        :src="props.pcImageSrc"
        :max-width="props.maxWidthPc"
        :min-width="props.minWidthPc"
        :max-height="props.maxHeightPc"
        :min-height="props.minHeightPc"
    />
    <v-img
        class="hidden-sm-and-up mobile-image-container"
        :src="props.mobileImageSrc"
        :max-width="props.maxWidthMobile"
        :min-width="props.minWidthMobile"
        :max-height="props.maxHeightMobile"
        :min-height="props.minHeightMobile"
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
    maxWidthPc: {
        type: Number,
        required: false,
        default: 1000
    },
    maxHeightPc: {
        type: Number,
        required: false
    },
    minWidthPc: {
        type: Number,
        required: false
    },
    minHeightPc: {
        type: Number,
        required: false
    },
    maxWidthMobile: {
        type: Number,
        required: false
    },
    maxHeightMobile: {
        type: Number,
        required: false,
        default: 600
    },
    minWidthMobile: {
        type: Number,
        required: false
    },
    minHeightMobile: {
        type: Number,
        required: false
    }
});
</script>
