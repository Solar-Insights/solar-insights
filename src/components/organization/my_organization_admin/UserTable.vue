<template>
    <div class="home-subtitle-container pt-16">
        <div class="page-subtitle mb-3">{{ $t(`my-organization.admin-component.title`) }}</div>
    </div>

    <v-data-table :items="users" :headers="headers" :sort-by="[{ key: 'created_date', 'order': 'desc' }]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title> {{ $t(`my-organization.admin-component.user-table.title`) }} </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn class="mb-2 font-weight-bold" color="theme">
                    {{ $t(`my-organization.admin-component.user-table.actions.new-user.action-name`) }}

                    <v-dialog v-model="addUserDialog" activator="parent" max-width="600">
                        <v-card class="rounded-lg">
                            <v-card-title class="mt-3">
                                <div class="d-flex">
                                    <v-icon>mdi-account-plus-outline</v-icon>
                                    <div class="ml-4">{{ $t(`my-organization.admin-component.user-table.actions.new-user.title`) }}</div>
                                </div>
                            </v-card-title>
                            
                            <v-form v-model="validForm" @submit.prevent>
                                <v-card-text>
                                    <div class="form-subtitle-in-card">{{ $t(`my-organization.admin-component.user-table.actions.new-user.user-info`) }}</div>
                                    <v-sheet class="form-section-in-sheet">
                                        <v-text-field
                                            v-model="newUserEmail"
                                            :rules="emailRules"
                                            :label="$t(`my-organization.admin-component.user-table.actions.new-user.email`)"
                                            density="compact"
                                            variant="outlined"
                                            prepend-inner-icon="mdi-at"
                                            rounded
                                            required
                                        />

                                        <v-text-field
                                            v-model="newUserName"
                                            :rules="nameRules"
                                            :label="$t(`my-organization.admin-component.user-table.actions.new-user.name`)"
                                            density="compact"
                                            variant="outlined"
                                            prepend-inner-icon="mdi-account-circle-outline"
                                            rounded
                                            required
                                        />
                                    </v-sheet>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn @click="addUserDialog = false" class="font-weight-medium" variant="flat">
                                        {{ $t(`my-organization.admin-component.user-table.actions.new-user.cancel`) }}
                                    </v-btn>

                                    <v-btn
                                        @click="createUser"
                                        class="font-weight-medium"
                                        variant="flat"
                                        color="theme"
                                        type="submit"
                                    >
                                    {{ $t(`my-organization.admin-component.user-table.actions.new-user.create-new-user`) }}
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-dialog>
                </v-btn>

                <v-dialog v-model="deleteUserDialog" max-width="600">
                    <v-card class="rounded-lg">
                        <v-card-title class="mt-3">
                            <div class="d-flex">
                                <v-icon>mdi-delete-outline</v-icon>
                                <div class="ml-4">{{ $t(`my-organization.admin-component.user-table.actions.delete-user.title`) }}</div>
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
import { deleteUserFromOrganization, createUserForOrganization } from "@/api/user";
import { useI18n } from "vue-i18n";

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
        title:t(`my-organization.admin-component.user-table.column-titles.actions`), 
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

const emits = defineEmits(["addUser", "deleteUser"])

const headers = ref(UserDataHeaders);
const addUserDialog = ref<boolean>(false);
const deleteUserDialog = ref<boolean>(false);

const validForm = ref<boolean>(false);
const newUserName = ref<string>("");
const nameRules = ref([
    (value: string) => {
        if (value) return true;
        return "";
    }
]);
const newUserEmail = ref<string>("");
const emailRules = ref([
    (value: string) => {
        if (value) return true;
        return "";
    },
    (value: string) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) return true;
        return "";
    }
]);

const selectedUserToDelete = ref<MyOrganizationMember>({} as MyOrganizationMember);

function openDeleteUserDialog(user: MyOrganizationMember) {
    selectedUserToDelete.value = user;
    deleteUserDialog.value = true;
}

async function createUser() {
    if (!validForm.value) { return; }

    addUserDialog.value = false;
    
    await createUserForOrganization(newUserEmail.value, newUserName.value)
        .then((data: MyOrganizationMember) => {
            newUserEmail.value = "";
            newUserName.value = "";
            emits("addUser", data)
        })
        .catch(() => {})
}

async function deleteUser() {
    await deleteUserFromOrganization(selectedUserToDelete.value)
        .then(() => {
            emits("deleteUser", selectedUserToDelete.value)
        })
        .catch(() => {})
}
</script>
