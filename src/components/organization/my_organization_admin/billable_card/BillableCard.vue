<template>
    <v-col cols="12" xs="12" :sm="fullWidth ? 12 : 6" :md="fullWidth ? 12 : 6" :class="fullWidth ? `px-0` : ``">
        <v-card class="billable-card" :max-width="fullWidth ? `` : `600`">
            <v-card-text class="billable-card-container">
                <div class="billable-card-title">{{ title }}</div>

                <slot></slot>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    fullWidth: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>
