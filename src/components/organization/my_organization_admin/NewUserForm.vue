<template>
    <FormDialog
        :formTitle="$t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.title`)"
        formIcon="mdi-account-plus-outline"
        :formCancelButton="$t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.cancel`)"
        :formConfirmButton="$t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.create-new-user`)"
        :formClose="closeForm"
        :formLoadingResponse="loadingResponse"
        @validateForm="createUser"
        @formWasClosed="closeForm = false;"
    >
        <FormDialogSection :sectionTitle="$t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.user-info`)">
            <FormField>
                <v-text-field
                    v-model="data.email"
                    class="mb-3"
                    :error-messages="createValidationMessages(v$.email.$errors.map((e: any) => e.$params))"
                    :counter="EMAIL_MAX_LENGTH"
                    @blur="v$.email.$touch"
                    @input="v$.email.$touch"
                    :label="
                        $t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.email`)
                    "
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-at"
                    rounded
                    required
                />
            </FormField>

            <FormField>
                <v-text-field
                    v-model="data.name"
                    class="mb-3"
                    :error-messages="createValidationMessages(v$.name.$errors.map((e: any) => e.$params))"
                    :counter="NAME_MAX_LENGTH"
                    @blur="v$.name.$touch"
                    @input="v$.name.$touch"
                    :label="
                        $t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.name`)
                    "
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-account-circle-outline"
                    rounded
                    required
                />
            </FormField>

            <ParagraphContainer
                class="w-100"
                :paragraphContent="$t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.paragraph-1`)"
            />

            <ParagraphContainer
                class="w-100"
                :paragraphContent="$t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.paragraph-2`)"
            />

            <ParagraphContainer
                class="w-100"
                :paragraphContent="$t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.paragraph-3`)"
            >
                <div 
                    v-if="objectHasValue(userCountSummary)"
                    :class="`text-${userQuotaAlert}`"
                >
                    {{ $t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.paragraph-4-${userQuotaAlert}`) }}
                </div>

                <div v-else>
                    {{ $t(`my-organization.admin-component.user-table-section-container.user-table.actions.new-user.paragraph-4-no-data`) }}
                </div>
            </ParagraphContainer>
        </FormDialogSection>
    </FormDialog>
</template>

<script setup lang="ts">
import { MyOrganizationMember, NewOrganizationUserForm, UserCountSummary } from "@/helpers/types";
import { computed, PropType, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import FormDialog from "@/components/page_sections/FormDialog.vue";
import FormDialogSection from "@/components/page_sections/FormDialogSection.vue";
import FormField from "@/components/page_sections/FormField.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import { newOrganizationUserFormValidators } from "@/helpers/form_validation/createOrganizationUserFormValidators";
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH } from "@/helpers/form_validation/constants";
import { createValidationMessages } from "@/helpers/form_validation/genericValidators";
import { createUserForOrganization } from "@/api/user";
import { objectHasValue } from "@/helpers/componentConditionals";
import { userCountSummaryToAlertType } from "@/helpers/util";

const props = defineProps({
    userCountSummary: {
        type: Object as PropType<UserCountSummary | undefined>,
        required: true
    }
})

const emits = defineEmits(["formWasSent"]);

const userQuotaAlert = computed(() => {
    if (!props.userCountSummary) return;
    return userCountSummaryToAlertType(props.userCountSummary)
});
const closeForm = ref<boolean>(false);
const loadingResponse = ref<boolean>(false);

const data = ref<NewOrganizationUserForm>({
    email: "",
    name: ""
});

const rules = computed(() => {
    return newOrganizationUserFormValidators;
});

const v$ = useVuelidate(rules, data);

const validForm = ref<boolean>(false);

async function createUser() {
    validForm.value = await v$.value.$validate();
    if (!validForm.value) return;

    loadingResponse.value = true;
    await createUserForOrganization(data.value)
        .then((newMember: MyOrganizationMember) => {
            data.value.email = "";
            data.value.name = "";
            v$.value.$reset();
            emits("formWasSent", newMember);
        })
        .catch(() => {});
    loadingResponse.value = false;

    closeForm.value = true;
}
</script>
