<template>
    <v-row class="billable-item-container">
        <v-col class="billable-item-title" cols="9">
            <div>
                {{ title }}
            </div>
            <div class="text-body-2">
                {{ precision }}
            </div>
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
    precision: {
        type: String,
        required: false,
    },
    value: {
        type: [String, Number],
        required: true,
    }
});
</script>