<template>
    <FormDialog
        :formTitle="$t(`pricing.pricing-form.title`)"
        formIcon="mdi-account-multiple-plus-outline"
        :formCancelButton="$t(`pricing.pricing-form.cancel-action`)"
        :formConfirmButton="$t(`pricing.pricing-form.confirm-action`)"
        :formClose="closeForm"
        :formLoadingResponse="loadingResponse"
        @validateForm="sendNewOrganizationRequest"
        @formWasClosed="closeForm = false"
    >
        <FormDialogSection :sectionTitle="$t(`pricing.pricing-form.user-info-section.title`)">
            <FormField>
                <v-text-field
                    v-model="data.name"
                    class="mb-3"
                    :error-messages="vuelidate.name.$errors.map((e) => e.$message as string)"
                    :label="$t(`pricing.pricing-form.user-info-section.fields.name`)"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-account-outline"
                    rounded
                />
            </FormField>

            <FormField>
                <v-text-field
                    v-model="data.contactEmail"
                    class="mb-3"
                    :error-messages="vuelidate.contactEmail.$errors.map((e) => e.$message as string)"
                    :label="$t(`pricing.pricing-form.user-info-section.fields.email`)"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-at"
                    rounded
                />
            </FormField>

            <FormField>
                <v-select
                    class="mb-3"
                    v-model="props.pricingName"
                    :error-messages="vuelidate.pricingTier.$errors.map((e) => e.$message as string)"
                    :label="$t(`pricing.pricing-form.user-info-section.fields.pricing-plan`)"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-currency-usd"
                    rounded
                />
            </FormField>
        </FormDialogSection>

        <FormDialogSection :sectionTitle="$t(`pricing.pricing-form.additional-info-section.title`)">
            <FormField>
                <v-textarea
                    v-model="data.additionalNotes"
                    :error-messages="vuelidate.additionalNotes.$errors.map((e) => e.$message as string)"
                    :label="$t(`pricing.pricing-form.additional-info-section.fields.situation`)"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-text"
                    rows="3"
                    auto-grow
                />
            </FormField>
        </FormDialogSection>
    </FormDialog>
</template>

<script setup lang="ts">
import { NewOrganizationForm, PricingTier } from "@/helpers/types";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength, helpers } from "@vuelidate/validators";
import FormDialog from "@/components/page_sections/FormDialog.vue";
import FormDialogSection from "@/components/page_sections/FormDialogSection.vue";
import FormField from "@/components/page_sections/FormField.vue";
import { postCreateOrganizationForm } from "@/api/client";

const t = useI18n().t;

const props = defineProps({
    pricingTier: {
        type: String as PropType<PricingTier>,
        required: true
    },
    pricingName: {
        type: String,
        required: true
    }
});

const emits = defineEmits(["addUser", "deleteUser"]);

const closeForm = ref<boolean>(false);

const loadingResponse = ref<boolean>(false);

const data = ref<NewOrganizationForm>({
    name: "",
    contactEmail: "",
    pricingTier: props.pricingTier,
    additionalNotes: ""
});

const rules = computed(() => {
    return {
        name: {
            maxLength: helpers.withMessage("Max length", maxLength(256)),
            required: helpers.withMessage("Needed", required)
        },
        contactEmail: {
            maxLength: helpers.withMessage("Max length", maxLength(256)),
            required: helpers.withMessage("Needed", required),
            email: helpers.withMessage("Email", email)
        },
        pricingTier: {
            required: helpers.withMessage("Needed", required)
        },
        additionalNotes: {
            maxLength: helpers.withMessage("Max length", maxLength(1024))
        }
    };
});

const vuelidate = useVuelidate(rules, data);

const validForm = ref<boolean>(false);

async function sendNewOrganizationRequest() {
    validForm.value = await vuelidate.value.$validate();
    if (!validForm.value) return;

    loadingResponse.value = true;
    await postCreateOrganizationForm(data.value).catch((error) => {
        console.log(error); // do something here
    });
    loadingResponse.value = false;


    closeForm.value = true;
}
</script>
