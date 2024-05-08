<template>
    <v-data-table :items="users" :headers="headers">
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
                                    <div class="ml-4"> Create a new user </div>
                                </div>
                            </v-card-title>

                            <v-card-text>
                                <div class="form-subtitle-in-card">User info</div>
                                <v-sheet class="form-section-in-sheet">
                                    <v-text-field
                                        v-model="newUserForm.email"
                                        label="Email"
                                        density="compact"
                                        variant="outlined"
                                        type="email"
                                        prepend-inner-icon="mdi-at"
                                        rounded
                                    />

                                    <v-text-field
                                        v-model="newUserForm.name"
                                        label="Name"
                                        density="compact"
                                        variant="outlined"
                                        prepend-inner-icon="mdi-account-circle-outline"
                                        rounded
                                    />
                                </v-sheet>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn @click="addUserDialog = false" class="font-weight-medium" variant="flat">
                                    Cancel
                                </v-btn>

                                <v-btn
                                    @click="
                                        addUserDialog = false;
                                        createUser(newUserForm);
                                    "
                                    class="font-weight-medium"
                                    variant="flat"
                                    color="theme"
                                >
                                    Create user account
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-btn>

                <v-dialog v-model="deleteUserDialog" activator="#delete-user-activator-target" max-width="600">
                    <v-card class="rounded-lg">
                        <v-card-title class="mt-3">
                            <div class="d-flex">
                                <v-icon>mdi-delete-outline</v-icon>
                                <div class="ml-4"> Do you really want to delete this user? </div>
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
                                    deleteUser;
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

        <template v-slot:item.actions>
            <v-btn size="small" icon flat id="delete-user-activator-target">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { UserData } from '@/helpers/types';
import { PropType, ref } from 'vue';
import { deleteUserFromOrganization, createUserForOrganization } from '@/api/user';
import { UserDataHeaders } from '@/helpers/constants';

const props = defineProps({
    users: {
        type: Object as PropType<UserData[]>,
        required: true
    }
});

const headers = ref(UserDataHeaders);
const addUserDialog = ref<boolean>(false);
const deleteUserDialog = ref<boolean>(false);
const newUserForm = ref<UserData>({
    created_date: "",
    email: "",
    name: ""
})

async function createUser(user: UserData) {
    const newUserCopy: UserData = {
        created_date: new Date().toISOString().substring(0, 10),
        email: user.email,
        name: user.email
    }

    newUserForm.value = {
        created_date: "",
        email: "",
        name: ""
    }

    await createUserForOrganization(newUserCopy);
}

async function deleteUser(user: UserData) {
    console.log(user);

    await deleteUserFromOrganization(user);
}
</script>