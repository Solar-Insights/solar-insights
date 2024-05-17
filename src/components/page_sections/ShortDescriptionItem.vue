<template>
    <v-col class="short-description-single-item-container" cols="12" xs="12" sm="6" md="3">
        <v-icon 
            v-if="stringHasValue(props.shortDescriptionItem.itemIcon)" 
            class="short-description-item-icon" 
            size="x-large"
        >
            {{ shortDescriptionItem.itemIcon }}
        </v-icon>

        <div class="short-description-item-title">
            {{ shortDescriptionItem.itemTitle }}
        </div>
        
        <div class="short-description-item-content">
            {{ shortDescriptionItem.itemContent}}
        </div>
    </v-col>
</template>

<script setup lang="ts">
import { ShortDescriptionItem } from '@/helpers/types';
import { PropType } from 'vue';
import { stringHasValue } from '@/helpers/componentConditionals';

const props = defineProps({
    shortDescriptionItem: {
        type: Object as PropType<ShortDescriptionItem>,
        required: true
    }
});

</script>