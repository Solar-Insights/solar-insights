<template>
    <UserTable :users="myOrganizationMembers" @addUser="addOrganizationMember" @deleteUser="deleteOrganizationMember"/>
</template>

<script setup lang="ts">
import { MyOrganizationMember } from "@/helpers/types";
import { onMounted, ref } from "vue";
import UserTable from "@/components/organization//my_organization_admin/UserTable.vue";
import { getMyOrganizationMembers } from "@/api/user";

const myOrganizationMembers = ref<MyOrganizationMember[]>([]);

onMounted(async () => {
    await getMyOrganizationMembers()
        .then((data: MyOrganizationMember[]) => {
            myOrganizationMembers.value = data;
        })
        .catch(() => {});
})

function addOrganizationMember(user: MyOrganizationMember) {
    myOrganizationMembers.value.push(user);
}

function deleteOrganizationMember(user: MyOrganizationMember) {
    const indexToRemove = myOrganizationMembers.value.findIndex(
        (userToDelete: MyOrganizationMember) => userToDelete.email === user.email
    )

    if (indexToRemove === -1) return;

    myOrganizationMembers.value.splice(indexToRemove, 1)
}
</script>
