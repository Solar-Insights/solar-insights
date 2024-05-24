<template>
    <div class="paragraph-container">
        <div v-if="stringHasValue(props.paragraphContent)" class="paragraph-content">
            {{ props.paragraphContent }}
        </div>

        <div v-if="objectHasValue(props.paragraphAction)" class="paragraph-action">
            <v-btn
                @click="emits('onParagraphActionClick')"
                class="rounded-lg font-weight-medium"
                elevation="2"
                color="theme"
                :append-icon="props.paragraphAction?.icon"
            >
                {{ props.paragraphAction?.text }}
            </v-btn>
        </div>

        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ButtonAction } from '@/helpers/types';
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";
import { PropType } from 'vue';

const props = defineProps({
    paragraphContent: {
        type: String,
        required: true
    },
    paragraphAction: {
        type: Object as PropType<ButtonAction>,
        required: false
    }
});

const emits = defineEmits(["onParagraphActionClick"]);
</script>
