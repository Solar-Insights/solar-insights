<template>
    <v-dialog v-model="dialog" activator="parent" max-width="600">
        <v-card class="rounded-lg">
            <v-card-title class="mt-3">
                <div class="d-flex">
                    <v-icon>{{ props.formIcon }}</v-icon>
                    <div class="ml-4">{{ props.formTitle }}</div>
                </div>
            </v-card-title>

            <v-card-text>
                <slot></slot>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="dialog = false" class="font-weight-medium" variant="flat">
                    {{ props.formCancelButton }}
                </v-btn>

                <v-btn @click="emits(`validateForm`)" class="font-weight-medium" variant="flat" color="theme" :loading="formLoadingResponse">
                    {{ props.formConfirmButton }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
    formTitle: {
        type: String,
        required: true
    },
    formIcon: {
        type: String,
        required: true
    },
    formCancelButton: {
        type: String,
        required: true
    },
    formConfirmButton: {
        type: String,
        required: true
    },
    formClose: {
        type: Boolean,
        required: true
    },
    formLoadingResponse: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(["validateForm", "formWasClosed"]);

const dialog = ref<boolean>(false);

watch(
    () => props.formClose,
    () => {
        if (!props.formClose) return;

        dialog.value = false;
        emits("formWasClosed");
    }
);
</script>
