<template>
    <v-row class="short-description-items-container">
        <ShortDescriptionItem 
            v-for="shortDescriptionItem in shortDescriptionItems"
            :shortDescriptionItem="shortDescriptionItems"
        />
    </v-row>
</template>

<script setup lang="ts">
import { ShortDescriptionItem } from '@/helpers/types';
import { PropType } from 'vue';

const props = defineProps({
    shortDescriptionItems: {
        type: Object as PropType<ShortDescriptionItem[]>,
        required: true
    }
});
</script>
