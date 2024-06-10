<template>
    <FormDialog
        :formTitle="$t(`my-organization.admin-component.user-table.actions.delete-user.title`)"
        formIcon="mdi-delete-outline"
        :formCancelButton="$t(`my-organization.admin-component.user-table.actions.delete-user.cancel`)"
        :formConfirmButton="$t(`my-organization.admin-component.user-table.actions.delete-user.confirm`)"
        :formClose="closeForm"
        :formLoadingResponse="loadingResponse"
        @validateForm="deleteUser"
        @formWasClosed="closeForm = false;"
    >
        <ParagraphContainer 
            class="font-weight-bold w-100"
            :paragraphContent="`${selectedUserToDelete.name} - ${selectedUserToDelete.email}`"
        />

        <ParagraphContainer
            class="w-100"
            :paragraphContent="$t(`my-organization.admin-component.user-table.actions.delete-user.paragraph-1`)"
        />

        <ParagraphContainer
            class="w-100"
            :paragraphContent="$t(`my-organization.admin-component.user-table.actions.delete-user.paragraph-2`)"
        />

        <ParagraphContainer
            class="w-100"
            :paragraphContent="$t(`my-organization.admin-component.user-table.actions.delete-user.paragraph-3`)"
        />
    </FormDialog>
</template>

<script setup lang="ts">
import FormDialog from "@/components/page_sections/FormDialog.vue";
import { MyOrganizationMember } from "@/helpers/types";
import { PropType, ref } from "vue";
import { deleteUserFromOrganization } from "@/api/user";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";

const props = defineProps({
    selectedUserToDelete: {
        type: Object as PropType<MyOrganizationMember>,
        required: true
    }
});

const emits = defineEmits(["formWasSent"]);

const closeForm = ref<boolean>(false);

const loadingResponse = ref<boolean>(false);

async function deleteUser() {
    loadingResponse.value = true;
    await deleteUserFromOrganization(props.selectedUserToDelete)
        .then(() => {
            emits("formWasSent", props.selectedUserToDelete);
        })
        .catch(() => {});
    loadingResponse.value = false;
    closeForm.value = true;
}
</script>
