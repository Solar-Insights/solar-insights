<template>
    <v-card
        @click="emits(`sendAction`)"
        :class="theme === 'dark' ? 'dark-app-menu-card' : 'light-app-menu-card'"
        elevation="1"
        :variant="theme === 'dark' ? 'tonal' : 'elevated'"
    >
        <v-row>
            <v-col 
                v-if="stringHasValue(props.icon)" 
                class="app-menu-option-icon-container" 
                cols="auto" 
                align-self="center"
            >
                <v-icon>{{ props.icon}}</v-icon>
            </v-col>
            <v-col>
                <div>{{ props.text }}</div>
                <div v-if="stringHasValue(props.detail)" class="detail-text pb-0">
                    {{ props.detail }}
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
import { stringHasValue } from "@/helpers/componentConditionals";
import { Theme } from "@/helpers/types";
import { PropType } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";

const userSessionStore = useUserSessionStore();

const { theme } = storeToRefs(userSessionStore);

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    theme: {
        type: String as PropType<Theme>,
        required: true
    },
    icon: {
        type: String,
        required: false
    },
    detail: {
        type: String,
        required: false
    },
});

const emits = defineEmits(["sendAction"]);

</script>