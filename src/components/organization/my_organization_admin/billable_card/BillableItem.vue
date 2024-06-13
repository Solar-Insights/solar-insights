<template>
    <v-row class="billable-item-container">
        <v-col class="billable-item-title" cols="9">
            {{ title }}
        </v-col>
        <v-col class="billable-item-value" cols="3" align="center">
            {{ value }}
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    }
});
</script>