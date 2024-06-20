<template>
    <div class="page-subtitle-container">
        <div v-if="stringHasValue(props.pageSubtitlePrecontent)" class="page-subtitle-precontent">
            {{ props.pageSubtitlePrecontent }}
        </div>

        <div v-if="stringHasValue(props.pageSubtitle)" class="page-subtitle">
            <v-icon v-if="stringHasValue(props.pageSubtitleIcon)" class="mb-3" size="small">
                {{ props.pageSubtitleIcon }}
            </v-icon>

            <div>
                {{ props.pageSubtitle }}
            </div>
        </div>

        <div v-if="stringHasValue(props.pageSubtitlePrecision)" class="page-subtitle-precision">
            {{ props.pageSubtitlePrecision }}
        </div>

        <div class="page-subtitle-content">
            <slot></slot>
        </div>

        <div v-if="objectHasValue(props.pageSubtitleAction)" class="page-subtitle-action">
            <PageAction 
                :action="props.pageSubtitleAction"
                @onPageActionClick="emits('onPageSubtitleActionClick')"
                style="width: 250px;"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";
import { ButtonAction } from "@/helpers/types";
import PageAction from "@/components/page_sections/PageAction.vue";

const props = defineProps({
    pageSubtitlePrecontent: {
        type: String,
        required: false
    },
    pageSubtitle: {
        type: String,
        required: true
    },
    pageSubtitleIcon: {
        type: String,
        required: false
    },
    pageSubtitlePrecision: {
        type: String,
        required: false
    },
    pageSubtitleAction: {
        type: Object as PropType<ButtonAction>,
        required: false
    }
});

const emits = defineEmits(["onPageSubtitleActionClick"]);
</script>
