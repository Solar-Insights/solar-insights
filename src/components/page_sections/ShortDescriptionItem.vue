<template>
    <v-col class="short-description-single-item-container" cols="12" xs="12" sm="6" md="3">
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
            {{ itemContent}}
        </div>
    </v-col>
</template>

<script setup lang="ts">
import { stringHasValue } from '@/helpers/componentConditionals';

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
    }
});

</script>