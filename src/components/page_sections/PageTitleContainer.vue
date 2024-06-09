<template>
    <div class="page-title-container">
        <div v-if="stringHasValue(props.pageTitlePrecontent)" class="page-title-precontent">
            {{ props.pageTitlePrecontent }}
        </div>
        <div v-if="stringHasValue(props.pageTitle)" class="page-title">{{ props.pageTitle }}</div>
        <div v-if="stringHasValue(props.pageTitlePrecision)" class="page-title-precision">
            {{ props.pageTitlePrecision }}
        </div>
        <div v-if="objectHasValue(props.pageTitleAction)">
            <PageTitleAction
                v-if="pageTitleAction"
                :pageTitleAction="pageTitleAction"
                @onPageTitleActionClick="emits('onPageTitleActionClick')"
            />
        </div>

        <!-- Add custom actions for special pages -->
        <div v-if="!objectHasValue(props.pageTitleAction)" class="page-title-action">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageTitleAction from "@/components/page_sections/PageTitleAction.vue";
import { PropType } from "vue";
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";
import { PageTitleActionType } from "@/helpers/types";

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
        type: Object as PropType<PageTitleActionType>,
        required: false
    }
});

const emits = defineEmits(["onPageTitleActionClick"]);
</script>
