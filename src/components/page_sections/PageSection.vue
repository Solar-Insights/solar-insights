<template>
    <v-card 
        class="page-section-container" 
        elevation="0"
    >
        <div class="page-section-title-container">
            <v-card-title 
                v-if="stringHasValue(pageSectionTitle)" 
                class="page-section-title"
            >
                {{ pageSectionTitle }}
            </v-card-title>

            <v-card-subtitle
                v-if="stringHasValue(pageSectionSubtitle)"
                class="page-section-subtitle"
            >
                {{ pageSectionSubtitle }}
            </v-card-subtitle>
        </div>

        <slot></slot>
    </v-card>
</template>

<script setup lang="ts">
import { stringHasValue } from "@/helpers/componentConditionals";

const props = defineProps({
    pageSectionTitle: {
        type: String,
        required: false
    },
    pageSectionSubtitle: {
        type: String,
        required: false
    }
});
</script>
