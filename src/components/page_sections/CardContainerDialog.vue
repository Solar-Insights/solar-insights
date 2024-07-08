<template>
    <v-card class="rounded-lg">
        <v-card-title class="mt-3">
            <div class="d-flex">
                <v-icon>{{ props.icon }}</v-icon>
                <div class="ml-4">{{ props.title }}</div>
            </div>
        </v-card-title>

        <v-card-text class="font-weight-light">
            <slot></slot>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn @click="emits(`closeButtonClicked`)" class="font-weight-medium" variant="flat">
                {{ props.cancelButton }}
            </v-btn>

            <v-btn
                v-if="stringHasValue($props.confirmButton)"
                @click="emits(`confirmButtonClicked`)"
                class="font-weight-medium"
                variant="flat"
                color="theme"
                :loading="loading"
            >
                {{ props.confirmButton }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { stringHasValue } from "@/helpers/componentConditionals";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    cancelButton: {
        type: String,
        required: true
    },
    confirmButton: {
        type: String,
        required: false
    },
    loading: {
        type: Boolean,
        required: false,
        default: false
    }
});

const emits = defineEmits(["confirmButtonClicked", "closeButtonClicked"]);
</script>
