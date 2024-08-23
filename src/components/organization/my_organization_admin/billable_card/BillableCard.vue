<template>
    <v-col cols="12" xs="12" :sm="fullWidth ? 12 : 6" :md="fullWidth ? 12 : 6" :class="fullWidth ? `px-0` : ``">
        <v-card class="billable-card" :max-width="fullWidth ? `` : `600`">
            <v-card-text class="billable-card-container">
                <div class="billable-card-title-container">
                    <div class="billable-card-title">
                        {{ title }}
                    </div>

                    <v-btn
                        v-if="objectHasValue(action)"
                        @click="emits(`onActionClick`)"
                        class="billable-card-title-action"
                        elevation="2"
                        color="theme"
                        :append-icon="stringHasValue(action!.icon) ? action!.icon : ``"
                    >
                        {{ action!.text }}
                    </v-btn>
                </div>

                <slot></slot>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { ButtonAction } from "@/helpers/types";
import { PropType } from "vue";
import { objectHasValue, stringHasValue } from "@/helpers/componentConditionals";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    fullWidth: {
        type: Boolean,
        required: false,
        default: false
    },
    action: {
        type: Object as PropType<ButtonAction>,
        required: false
    }
});

const emits = defineEmits(["onActionClick"]);
</script>
