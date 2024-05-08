<template>
    <div class="home-subtitle-container pt-16">
        <div class="page-subtitle mb-3">Members</div>
    </div>

    <v-data-table :items="users" :headers="headers" :sort-by="[{ key: 'created_date', 'order': 'desc' }]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title> Members </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn class="mb-2 font-weight-bold" color="theme">
                    New user

                    <v-dialog v-model="addUserDialog" activator="parent" max-width="600">
                        <v-card class="rounded-lg">
                            <v-card-title class="mt-3">
                                <div class="d-flex">
                                    <v-icon>mdi-account-plus-outline</v-icon>
                                    <div class="ml-4">Create a new user</div>
                                </div>
                            </v-card-title>
                            
                            <v-form v-model="validForm" @submit.prevent>
                                <v-card-text>
                                    <div class="form-subtitle-in-card">User info</div>
                                    <v-sheet class="form-section-in-sheet">
                                        <v-text-field
                                            v-model="newUserEmail"
                                            :rules="emailRules"
                                            label="*Email"
                                            density="compact"
                                            variant="outlined"
                                            prepend-inner-icon="mdi-at"
                                            rounded
                                            required
                                        />

                                        <v-text-field
                                            v-model="newUserName"
                                            :rules="nameRules"
                                            label="*Name"
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
                                        Cancel
                                    </v-btn>

                                    <v-btn
                                        @click="createUser"
                                        class="font-weight-medium"
                                        variant="flat"
                                        color="theme"
                                        type="submit"
                                    >
                                        Create user account
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
                                <div class="ml-4">Do you really want to delete this user?</div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn @click="deleteUserDialog = false" class="font-weight-medium" variant="flat">
                                Cancel
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
                                Confirm
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
import { UserDataHeaders } from "@/helpers/constants";

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
