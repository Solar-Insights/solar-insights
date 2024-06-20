<template>
    <v-card @click="emits('onPageTitleActionClick')" class="page-title-action" elevation="2" color="theme">
        <v-row class="pa-0">
            <v-col class="pa-0" cols="9">
                <div class="font-weight-medium">{{ props.pageTitleAction?.text }}</div>
            </v-col>
            <v-col class="pa-0" cols="3" align-self="center">
                <v-icon>{{ props.pageTitleAction?.icon }}</v-icon>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
import { PageTitleActionType } from "@/helpers/types";
import { PropType } from "vue";

const props = defineProps({
    pageTitleAction: {
        type: Object as PropType<PageTitleActionType>,
        required: true
    }
});

const emits = defineEmits(["onPageTitleActionClick"]);
</script>
