<template>
    <PageSubtitleContainer :pageSubtitle="$t(`my-organization.admin-component.title`)" />

    <v-data-table :items="users" :headers="headers" :sort-by="[{ key: 'created_date', order: 'desc' }]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title> {{ $t(`my-organization.admin-component.user-table.title`) }} </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn class="mb-2 font-weight-bold" color="theme">
                    {{ $t(`my-organization.admin-component.user-table.actions.new-user.action-name`) }}

                    <NewUserForm @formWasSent="userCreated"/>
                </v-btn>

                <v-dialog v-model="deleteUserDialog" max-width="600">
                    <v-card class="rounded-lg">
                        <v-card-title class="mt-3">
                            <div class="d-flex">
                                <v-icon>mdi-delete-outline</v-icon>
                                <div class="ml-4">
                                    {{ $t(`my-organization.admin-component.user-table.actions.delete-user.title`) }}
                                </div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn @click="deleteUserDialog = false" class="font-weight-medium" variant="flat">
                                {{ $t(`my-organization.admin-component.user-table.actions.delete-user.cancel`) }}
                            </v-btn>

                            <v-btn
                                @click="
                                    deleteUserDialog = false;
                                    deleteUser();
                                "
                                class="font-weight-medium"
                                variant="flat"
                                color="theme"
                            >
                                {{ $t(`my-organization.admin-component.user-table.actions.delete-user.confirm`) }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn size="small" icon flat @click="openDeleteUserDialog(item)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { MyOrganizationMember } from "@/helpers/types";
import { PropType, ref } from "vue";
import { deleteUserFromOrganization } from "@/api/user";
import { useI18n } from "vue-i18n";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import NewUserForm from "@/components/organization/my_organization_admin/NewUserForm.vue";

const t = useI18n().t;
const UserDataHeaders = [
    {
        title: t(`my-organization.admin-component.user-table.column-titles.email`),
        key: "email",
        sortable: true
    },
    {
        title: t(`my-organization.admin-component.user-table.column-titles.name`),
        key: "name",
        sortable: true
    },
    {
        title: t(`my-organization.admin-component.user-table.column-titles.creation-date`),
        key: "created_date",
        sortable: true
    },
    {
        title: t(`my-organization.admin-component.user-table.column-titles.actions`),
        key: "actions",
        align: "center",
        sortable: false
    }
] as any[];

const props = defineProps({
    users: {
        type: Object as PropType<MyOrganizationMember[]>,
        required: true
    }
});

const emits = defineEmits(["addUser", "deleteUser"]);

const headers = ref(UserDataHeaders);
const deleteUserDialog = ref<boolean>(false);

const selectedUserToDelete = ref<MyOrganizationMember>({} as MyOrganizationMember);

function openDeleteUserDialog(user: MyOrganizationMember) {
    selectedUserToDelete.value = user;
    deleteUserDialog.value = true;
}

async function deleteUser() {
    await deleteUserFromOrganization(selectedUserToDelete.value)
        .then(() => {
            emits("deleteUser", selectedUserToDelete.value);
        })
        .catch(() => {});
}

function userCreated(newMember: MyOrganizationMember) {
    emits("addUser", newMember);
}
</script>
