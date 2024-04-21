<template>
    <v-card class="rounded-lg my-2" variant="outlined">
        <v-card-title class="d-flex"> 
            <div class="mr-6">
                {{ i + 1 }}
            </div>
            <div>
                {{ step.title }}
            </div>
        </v-card-title>
        <v-card-text class="pa-2">
            <div v-for="content in step.contents" class="pa-2" v-html="content"></div>
            <v-img v-for="img in step.images" class="mx-auto my-6" :src="img" height="300" width="500"/>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    i: {
        type: Number,
        required: true
    },
    step: {
        type: Object as PropType<Step>,
        required: true
    }
});

type Step = {
    icon: string,
    title: string,
    contents: string[],
    images: string[]
};

</script>
