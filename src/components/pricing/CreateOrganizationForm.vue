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
                    :error-messages="createValidationMessages(v$.name.$errors.map((e: any) => e.$params))"
                    :counter="NAME_MAX_LENGTH"
                    @blur="v$.name.$touch"
                    @input="v$.name.$touch"
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
                    :error-messages="createValidationMessages(v$.contactEmail.$errors.map((e: any) => e.$params))"
                    :counter="EMAIL_MAX_LENGTH"
                    :label="$t(`pricing.pricing-form.user-info-section.fields.email`)"
                    @blur="v$.contactEmail.$touch"
                    @input="v$.contactEmail.$touch"
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
                    :error-messages="createValidationMessages(v$.pricingTier.$errors.map((e: any) => e.$params))"
                    @blur="v$.pricingTier.$touch"
                    @input="v$.pricingTier.$touch"
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
                    :error-messages="createValidationMessages(v$.additionalNotes.$errors.map((e: any) => e.$params))"
                    :counter="ADDITIONAL_NOTES_MAX_LENGTH"
                    @blur="v$.additionalNotes.$touch"
                    @input="v$.additionalNotes.$touch"
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
import useVuelidate from "@vuelidate/core";
import FormDialog from "@/components/page_sections/FormDialog.vue";
import FormDialogSection from "@/components/page_sections/FormDialogSection.vue";
import FormField from "@/components/page_sections/FormField.vue";
import { postCreateOrganizationForm } from "@/api/client";
import { newOrganizationFormValidators } from "@/helpers/form_validation/createOrganizationFormValidators";
import { ADDITIONAL_NOTES_MAX_LENGTH, EMAIL_MAX_LENGTH, NAME_MAX_LENGTH } from "@/helpers/form_validation/constants";
import { createValidationMessages } from "@/helpers/form_validation/genericValidators";

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

const emits = defineEmits(["addUser", "deleteUser", "formWasSent"]);

const closeForm = ref<boolean>(false);

const loadingResponse = ref<boolean>(false);

const data = ref<NewOrganizationForm>({
    name: "",
    contactEmail: "",
    pricingTier: props.pricingTier,
    additionalNotes: ""
});

const rules = computed(() => {
    return newOrganizationFormValidators;
});

const v$ = useVuelidate(rules, data);

const validForm = ref<boolean>(false);

async function sendNewOrganizationRequest() {
    validForm.value = await v$.value.$validate();
    if (!validForm.value) return;

    loadingResponse.value = true;
    await postCreateOrganizationForm(data.value)
        .then(() => {
            emits("formWasSent", data.value.contactEmail);
        })
        .catch(() => {});
    loadingResponse.value = false;

    closeForm.value = true;
}
</script>
