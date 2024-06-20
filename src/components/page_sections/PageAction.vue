<template>
    <v-card
        v-if="objectHasValue(props.action) && props.action && props.action.text"
        @click="emits('onPageActionClick')"
        class="page-action"
        elevation="2"
        color="theme"
    >
        <v-row class="pa-0">
            <v-col class="pa-0" cols="9">
                <div>{{ props.action?.text }}</div>
            </v-col>
            <v-col v-if="stringHasValue(props.action.icon)" class="pa-0" cols="3" align-self="center">
                <v-icon>{{ props.action?.icon }}</v-icon>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
import { ButtonAction } from "@/helpers/types";
import { PropType } from "vue";
import { stringHasValue, objectHasValue } from "@/helpers/componentConditionals";

const props = defineProps({
    action: {
        type: Object as PropType<ButtonAction | undefined>,
        required: true
    }
});

const emits = defineEmits([`onPageActionClick`]);
</script>
