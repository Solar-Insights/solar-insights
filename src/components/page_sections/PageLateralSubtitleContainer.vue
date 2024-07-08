<template>
    <v-row class="page-subtitle-container">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="5">
            <div v-if="stringHasValue(props.precontent)" class="page-subtitle-precontent">
                {{ props.precontent }}
            </div>

            <div v-if="stringHasValue(props.subtitle)" class="page-subtitle">
                <div style="text-align: left !important">
                    <v-icon v-if="stringHasValue(props.icon)" class="mb-2 mr-2" size="sm">
                        {{ props.icon }}
                    </v-icon>

                    {{ props.subtitle }}
                </div>
            </div>

            <div v-if="stringHasValue(props.precision)" class="page-subtitle-precision ml-0" style="text-align: left !important">
                {{ props.precision }}
            </div>

            <div v-if="objectHasValue(props.action)" class="page-subtitle-action">
                <PageAction
                    :action="props.action"
                    @onPageActionClick="emits('onActionClick')"
                    style="width: 250px"
                />
            </div>
        </v-col>

        <v-col class="py-0" cols="12" xs="12" sm="12" md="1"/>

        <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="page-subtitle-content pb-0">
                <slot></slot>
            </div>
        </v-col>
    </v-row>
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
    }
});

const emits = defineEmits(["onActionClick"]);
</script>
