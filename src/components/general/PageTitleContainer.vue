<template>
    <div class="page-title-container">
        <div v-if="stringHasValue(props.pageTitlePrecontent)" class="page-title-precontent">{{ props.pageTitlePrecontent }}</div>
        <div v-if="stringHasValue(props.pageTitle)" class="page-title">{{ props.pageTitle }}</div>
        <div v-if="stringHasValue(props.pageTitlePrecision)" class="page-title-precision">{{ props.pageTitlePrecision }}</div>
        <div v-if="objectHasValue(props.pageTitleAction)" class="page-title-action">
            <v-card
                @click="emits('onPageTitleActionClick')"
                class="pa-6 rounded-lg mx-auto"
                style="width: 250px"
                elevation="2"
                color="theme"
            >
                <v-row class="pa-0">
                    <v-col class="pa-0" cols="9">
                        <div style="font-weight: bold">{{ props.pageTitleAction?.text }}</div>
                    </v-col>
                    <v-col class="pa-0" cols="3" align-self="center">
                        <v-icon>{{ props.pageTitleAction?.icon }}</v-icon>
                    </v-col>
                </v-row>
            </v-card>
        </div>

        <!-- Add custom actions for special pages -->
        <div v-if="!objectHasValue(props.pageTitleAction)" class="page-title-action">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { stringHasValue, objectHasValue } from '@/helpers/componentConditionals';

const props = defineProps({
    pageTitlePrecontent: {
        type: String,
        required: false
    },
    pageTitle: {
        type: String,
        required: true
    },
    pageTitlePrecision: {
        type: String,
        required: false
    },
    pageTitleAction: {
        type: Object as PropType<PageTitleAction>,
        required: false
    }
});

const emits = defineEmits(["onPageTitleActionClick"]);

interface PageTitleAction {
    text: string,
    icon: string
};
</script>