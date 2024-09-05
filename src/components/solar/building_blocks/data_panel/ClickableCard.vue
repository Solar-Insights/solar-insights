<template>
    <v-card @click="emits(`onActionClick`)" class="clickable-map-card" variant="outlined">
        <v-card-item class="clickable-map-card-title" :prepend-icon="props.icon">
            {{ props.title }}
        </v-card-item>

        <v-card-item v-if="stringHasValue(props.paragraph)" class="clickable-map-card-paragraph" prepend-icon="null">
            {{ props.paragraph }}
        </v-card-item>
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
    paragraph: {
        type: String,
        required: false
    }
});

const emits = defineEmits(["onActionClick"]);
</script>