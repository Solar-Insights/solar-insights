<template>
    <FormDialog
        :formTitle="`Form title`"
        :formIcon="`mdi-file-document-plus-outline`"
        :formCancelButton="`Cancel`"
        :formConfirmButton="`Confirm`"
        :formClose="closeForm"
        @validateForm="sendNewOrganizationRequest"
        @formWasClosed="closeForm = false"
    >
        <FormDialogSection :sectionTitle="`Subtitle 1`">
            <v-text-field
                v-model="data.name"
                class="mb-3"
                :error-messages="(vuelidate.name.$errors).map(e => e.$message as string)"
                label="Name*"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                rounded
            />

            <v-text-field
                v-model="data.contactEmail"
                class="mb-3"
                :error-messages="(vuelidate.contactEmail.$errors).map(e => e.$message as string)"
                label="Contact email*"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-at"
                rounded
            />

            <v-select
                v-model="data.pricingTier"
                class="mb-3"
                :items="['Starter', 'Pro', 'Enterprise']"
                :error-messages="(vuelidate.pricingTier.$errors).map(e => e.$message as string)"
                label="Pricing tier*"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-currency-usd"
                rounded
            />
        </FormDialogSection>

        <FormDialogSection :sectionTitle="`Subtitle 2`">
            <v-textarea
                v-model="data.additionalNotes"
                :error-messages="(vuelidate.additionalNotes.$errors).map(e => e.$message as string)"
                label="Additional notes"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-text"
                rounded
            />
        </FormDialogSection>
    </FormDialog>
</template>

<script setup lang="ts">
import { NewOrganizationForm, PricingTier } from "@/helpers/types";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, maxLength, minLength, helpers, numeric } from "@vuelidate/validators";
import FormDialog from "@/components/page_sections/FormDialog.vue";
import FormDialogSection from "@/components/page_sections/FormDialogSection.vue";

const t = useI18n().t;

const props = defineProps({
    pricingTier: {
        type: Object as PropType<PricingTier>,
        required: false,
    }
});

const emits = defineEmits(["addUser", "deleteUser"]);

const closeForm = ref<boolean>(false);

const data = ref<NewOrganizationForm>({
    name: "",
    contactEmail: "",
    pricingTier: "Starter",
    additionalNotes: "",
});

const rules = computed(() => {
    return {
        name: {
            maxLength: helpers.withMessage("Max length", maxLength(256)),
            required: helpers.withMessage("Needed", required),
        },
        contactEmail: {
            maxLength: helpers.withMessage("Max length", maxLength(256)),
            required: helpers.withMessage("Needed", required),
            email: helpers.withMessage("Email", email)
        },
        pricingTier: {
            required: helpers.withMessage("Needed", required),
        },
        additionalNotes: {
            maxLength: helpers.withMessage("Max length", maxLength(1024)),
        }
    }
});

const vuelidate = useVuelidate(rules, data);

const validForm = ref<boolean>(false);

async function sendNewOrganizationRequest() {
    validForm.value = await vuelidate.value.$validate();
    if (!validForm.value) return;
    
    console.log("form is valid");
    closeForm.value = true;
}
</script>