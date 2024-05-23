<template>
    <FormDialog
        :formTitle="`Form title`"
        :formIcon="$t(`pricing.pricing-form.title`)"
        :formCancelButton="$t(`pricing.pricing-form.cancel-action`)"
        :formConfirmButton="$t(`pricing.pricing-form.confirm-action`)"
        :formClose="closeForm"
        @validateForm="sendNewOrganizationRequest"
        @formWasClosed="closeForm = false"
    >
        <FormDialogSection :sectionTitle="$t(`pricing.pricing-form.user-info-section.title`)">
            <v-text-field
                v-model="data.name"
                class="mb-3"
                :error-messages="(vuelidate.name.$errors).map(e => e.$message as string)"
                :label="$t(`pricing.pricing-form.user-info-section.fields.name`)"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                rounded
            />

            <v-text-field
                v-model="data.contactEmail"
                class="mb-3"
                :error-messages="(vuelidate.contactEmail.$errors).map(e => e.$message as string)"
                :label="$t(`pricing.pricing-form.user-info-section.fields.email`)"
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

        <FormDialogSection :sectionTitle="$t(`pricing.pricing-form.additional-info-section.title`)">
            <v-lazy>
                <v-textarea
                    v-model="data.additionalNotes"
                    :error-messages="(vuelidate.additionalNotes.$errors).map(e => e.$message as string)"
                    :label="$t(`pricing.pricing-form.additional-info-section.situation`)"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-text"
                    rows="3"
                    auto-grow
                />
            </v-lazy>
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
    pricingTier: "starter",
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