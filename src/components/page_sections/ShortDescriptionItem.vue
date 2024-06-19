<template>
    <v-col class="short-description-single-item-container" cols="12" xs="12" sm="6" md="3">
        <v-icon v-if="stringHasValue(props.itemIcon)" class="short-description-item-icon" size="x-large" :color="props.itemIconColor">
            {{ itemIcon }}
        </v-icon>

        <div class="short-description-item-title">
            {{ itemTitle }}
        </div>

        <div class="short-description-item-content">
            {{ itemContent }}
        </div>

        <div v-if="objectHasValue(props.itemAction)" class="short-description-single-item-action">
            <v-card
                @click="emits('onItemActionClick')"
                class="py-5 px-6 rounded-lg mx-auto text-center"
                elevation="2"
                color="theme"
            >
                <v-row class="pa-0">
                    <v-col class="pa-0 mx-auto" cols="9">
                        <div class="font-weight-medium">{{ props.itemAction?.text }}</div>
                    </v-col>
                    <v-col v-if="stringHasValue(props.itemAction?.icon)" class="pa-0" cols="3" align-self="center">
                        <v-icon>{{ props.itemAction?.icon }}</v-icon>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </v-col>
</template>

<script setup lang="ts">
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";
import { ButtonAction } from "@/helpers/types";
import { PropType } from "vue";

const props = defineProps({
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
