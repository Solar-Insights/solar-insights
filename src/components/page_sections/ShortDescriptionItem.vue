<template>
    <v-col
        class="short-description-single-item-container"
        :cols="$props.cols"
        :xs="$props.xs"
        :sm="$props.sm"
        :md="$props.md"
    >
        <v-icon
            v-if="stringHasValue(props.itemIcon)"
            class="short-description-item-icon"
            size="50"
            :color="props.itemIconColor"
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
            <PageAction :action="props.itemAction" @onPageActionClick="emits('onItemActionClick')" />
        </div>
    </v-col>
</template>

<script setup lang="ts">
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";
import { ButtonAction } from "@/helpers/types";
import { PropType } from "vue";
import PageAction from "@/components/page_sections/PageAction.vue";

const props = defineProps({
    cols: {
        type: [Number, String],
        required: true
    },
    xs: {
        type: [Number, String],
        required: true
    },
    sm: {
        type: [Number, String],
        required: true
    },
    md: {
        type: [Number, String],
        required: true
    },
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
    itemIconColor: {
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
