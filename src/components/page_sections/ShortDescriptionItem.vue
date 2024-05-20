<template>
    <v-col class="short-description-single-item-container" cols="12" xs="12" sm="6" md="4">
        <v-icon 
            v-if="stringHasValue(props.itemIcon)" 
            class="short-description-item-icon" 
            size="x-large"
        >
            {{ itemIcon }}
        </v-icon>

        <div class="short-description-item-title">
            {{ itemTitle }}
        </div>
        
        <div class="short-description-item-content">
            {{ itemContent }}
        </div>

        <div v-if="objectHasValue(props.itemAction)" class="short-description-single-item-action">
            <v-btn
                @click="emits('onItemActionClick')"
                class="rounded-lg font-weight-medium"
                elevation="2"
                color="theme"
                :append-icon="props.itemAction?.icon"
            >
                {{ props.itemAction?.text }}
            </v-btn>
        </div>
    </v-col>
</template>

<script setup lang="ts">
import { stringHasValue, objectHasValue } from '@/helpers/componentConditionals';
import { ButtonAction } from '@/helpers/types';
import { PropType } from 'vue';

const props = defineProps({
    itemTitle: {
        type: String,
        required: true
    },
    itemContent: {
        type: String,
        required: true
    },
    itemIcon: {
        type: String,
        required: false
    },
    itemAction: {
        type: Object as PropType<ButtonAction>,
        required: false
    }
});

const emits = defineEmits(["onItemActionClick"]);

</script>
