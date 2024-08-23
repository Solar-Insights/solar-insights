<template>
    <div class="page-subtitle-container">
        <div v-if="stringHasValue(props.precontent)" class="page-subtitle-precontent">
            {{ props.precontent }}
        </div>

        <div v-if="stringHasValue(props.subtitle)" class="page-subtitle" :class="center ? `text-center` : ``">
            <v-icon v-if="stringHasValue(props.icon)" class="mb-3" size="50">
                {{ props.icon }}
            </v-icon>

            <div>
                {{ props.subtitle }}
            </div>
        </div>

        <div
            v-if="stringHasValue(props.precision)"
            class="page-subtitle-precision"
            :class="center ? `text-center` : ``"
        >
            {{ props.precision }}
        </div>

        <div v-if="objectHasValue(props.action)" class="page-subtitle-action">
            <PageAction :action="props.action" @onPageActionClick="emits('onActionClick')" style="width: 250px" />
        </div>

        <div class="page-subtitle-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";
import { ButtonAction } from "@/helpers/types";
import PageAction from "@/components/page_sections/PageAction.vue";

const props = defineProps({
    precontent: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: false
    },
    precision: {
        type: String,
        required: false
    },
    action: {
        type: Object as PropType<ButtonAction>,
        required: false
    },
    center: {
        type: Boolean,
        default: true,
        required: false
    }
});

const emits = defineEmits(["onActionClick"]);
</script>
