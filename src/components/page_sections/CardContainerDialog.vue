<template>
    <v-card class="rounded-lg">
        <v-card-title class="mt-3">
            <div class="d-flex">
                <v-icon>{{ props.dialogIcon }}</v-icon>
                <div class="ml-4">{{ props.dialogTitle }}</div>
            </div>
        </v-card-title>

        <v-card-text class="font-weight-light">
            <slot></slot>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn @click="emits(`closeButtonClicked`)" class="font-weight-medium" variant="flat">
                {{ props.dialogCancelButton }}
            </v-btn>

            <v-btn
                v-if="stringHasValue($props.dialogConfirmButton)"
                @click="emits(`confirmButtonClicked`)"
                class="font-weight-medium"
                variant="flat"
                color="theme"
                :loading="dialogLoading"
            >
                {{ props.dialogConfirmButton }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { stringHasValue } from "@/helpers/componentConditionals";

const props = defineProps({
    dialogTitle: {
        type: String,
        required: true
    },
    dialogIcon: {
        type: String,
        required: true
    },
    dialogCancelButton: {
        type: String,
        required: true
    },
    dialogConfirmButton: {
        type: String,
        required: false
    },
    dialogLoading: {
        type: Boolean,
        required: false,
        default: false
    }
});

const emits = defineEmits(["confirmButtonClicked", "closeButtonClicked"]);
</script>
