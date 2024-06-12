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
        </FormDialogSection>
    </FormDialog>
</template>

<script setup lang="ts">
import { MyOrganizationMember, NewOrganizationUserForm } from "@/helpers/types";
import { computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import FormDialog from "@/components/page_sections/FormDialog.vue";
import FormDialogSection from "@/components/page_sections/FormDialogSection.vue";
import FormField from "@/components/page_sections/FormField.vue";
import { newOrganizationUserFormValidators } from "@/helpers/form_validation/createOrganizationUserFormValidators";
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH } from "@/helpers/form_validation/constants";
import { createValidationMessages } from "@/helpers/form_validation/genericValidators";
import { createUserForOrganization } from "@/api/user";

const emits = defineEmits(["formWasSent"]);

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
