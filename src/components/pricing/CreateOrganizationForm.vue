<template>
    <v-dialog v-model="dialog" activator="parent" max-width="600">
        <v-card class="rounded-lg">
            <v-card-title class="mt-3">
                <div class="d-flex">
                    <v-icon>mdi-file-document-plus-outline</v-icon>
                    <div class="ml-4">Form title</div>
                </div>
            </v-card-title>

            <v-card-text>
                <div class="form-subtitle-in-card">Subtitle 1</div>
                <v-sheet class="form-section-in-sheet">
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
                </v-sheet>

                <div class="form-subtitle-in-card">Subtitle 2</div>
                <v-sheet class="form-section-in-sheet">
                    <v-textarea
                        v-model="data.additionnalNotes"
                        :error-messages="(vuelidate.additionnalNotes.$errors).map(e => e.$message as string)"
                        label="Additionnal notes"
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-text"
                        rounded
                    />
                </v-sheet>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="dialog = false" class="font-weight-medium" variant="flat">
                    {{ $t("solar.toolbar.save.actions.cancel") }}
                </v-btn>

                <v-btn
                    @click="sendNewOrganizationRequest"
                    class="font-weight-medium"
                    variant="flat"
                    color="theme"
                >
                    {{ $t("solar.toolbar.save.actions.save") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { NewOrganizationForm, PricingTier } from "@/helpers/types";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, maxLength, minLength, helpers, numeric } from "@vuelidate/validators";

const t = useI18n().t;

const props = defineProps({
    pricingTier: {
        type: Object as PropType<PricingTier>,
        required: false,
    }
});

const emits = defineEmits(["addUser", "deleteUser"]);

const data = ref<NewOrganizationForm>({
    name: "",
    contactEmail: "",
    pricingTier: "Starter",
    additionnalNotes: "",
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
        additionnalNotes: {
            maxLength: helpers.withMessage("Max length", maxLength(1024)),
        }
    }
});

const vuelidate = useVuelidate(rules, data);

const dialog = ref<boolean>(false);

const validForm = ref<boolean>(false);

async function sendNewOrganizationRequest() {
    console.log("sending org request");
    validForm.value = await vuelidate.value.$validate();

    if (!validForm.value) return;
    else {
        console.log("form is valid");

        dialog.value = false;
    }
}
</script>