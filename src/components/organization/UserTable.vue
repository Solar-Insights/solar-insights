<template>
    <v-data-table :items="users" :headers="headers">
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" @click="deleteUser(item)"> mdi-delete </v-icon>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { UserData } from '@/helpers/types';
import { PropType, ref } from 'vue';
import { deleteUserFromOrganization } from '@/api/user';
import { UserDataHeaders } from '@/helpers/constants';

const props = defineProps({
    users: {
        type: Object as PropType<UserData[]>,
        required: true
    }
});

const headers = ref(UserDataHeaders);

async function deleteUser(user: UserData) {
    await deleteUserFromOrganization(user);
}
</script>