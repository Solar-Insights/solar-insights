<template>
    <div class="page-subtitle-container">
        <div v-if="stringHasValue(props.pageSubtitlePrecontent)" class="page-subtitle-precontent">
            {{ props.pageSubtitlePrecontent }}
        </div>
        <div v-if="stringHasValue(props.pageSubtitle)" class="page-subtitle">{{ props.pageSubtitle }}</div>
        <div v-if="stringHasValue(props.pageSubtitlePrecision)" class="page-subtitle-precision">
            {{ props.pageSubtitlePrecision }}
        </div>

        <!-- Add custom content -->
        <div class="page-subtitle-content">
            <slot></slot>
        </div>

        <div v-if="objectHasValue(props.pageSubtitleAction)" class="page-subtitle-action">
            <v-card
                @click="emits('onPageSubtitleActionClick')"
                class="pa-6 rounded-lg mx-auto"
                style="width: 250px"
                elevation="2"
                color="theme"
            >
                <v-row class="pa-0">
                    <v-col class="pa-0" cols="9">
                        <div class="font-weight-medium">{{ props.pageSubtitleAction?.text }}</div>
                    </v-col>
                    <v-col class="pa-0" cols="3" align-self="center">
                        <v-icon>{{ props.pageSubtitleAction?.icon }}</v-icon>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";
import { ButtonAction } from "@/helpers/types";

const props = defineProps({
    pageSubtitlePrecontent: {
        type: String,
        required: false
    },
    pageSubtitle: {
        type: String,
        required: true
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
