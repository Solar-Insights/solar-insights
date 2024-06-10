<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600"
    >
        <CardContainerDialog
            :dialogTitle="$t(`pricing.create-org-confirmation.title`)"
            :dialogIcon="`mdi-account-multiple-plus-outline`"
            :dialogCancelButton="$t(`pricing.create-org-confirmation.cancel-action`)"
            @closeButtonClicked="closeDialog"
        >
            <ParagraphContainer 
                class="w-100"
                :paragraphContent="$t(`pricing.create-org-confirmation.paragraph-1`)"
            />

            <ParagraphContainer 
                class="w-100"
                :paragraphContent="$t(`pricing.create-org-confirmation.paragraph-2`)"
            />

            <ParagraphContainer 
                class="w-100 font-weight-bold"
                :paragraphContent="requesterEmail"
            />

            <ParagraphContainer 
                class="w-100"
                :paragraphContent="$t(`pricing.create-org-confirmation.paragraph-3`)"
            />
        </CardContainerDialog>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CardContainerDialog from "@/components/page_sections/CardContainerDialog.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";

const props = defineProps({
    openDialog: {
        type: Boolean,
        required: true
    },
    requesterEmail: {
        type: String,
        required: true
    }
});

const emits = defineEmits(["dialogWasClosed"]);

const dialog = ref<boolean>(false);

watch(
    () => props.openDialog,
    () => {
        if (!props.openDialog) dialog.value = false;
        else dialog.value = true;
    }
);

function closeDialog() {
    emits("dialogWasClosed");
    dialog.value = false
}
</script>