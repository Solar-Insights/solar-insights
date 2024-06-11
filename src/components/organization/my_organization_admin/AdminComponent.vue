<template>
    {{ myOrganizationBillingRecap }}

    <UserTable :users="myOrganizationMembers" @addUser="addOrganizationMember" @deleteUser="deleteOrganizationMember" />
</template>

<script setup lang="ts">
import { MyOrganizationMember, MyOrganizationAdminDetails, MyOrganizationBillingRecap } from "@/helpers/types";
import { onMounted, ref } from "vue";
import UserTable from "@/components/organization//my_organization_admin/UserTable.vue";
import { getMyOrganizationAdminData } from "@/api/user";

const myOrganizationMembers = ref<MyOrganizationMember[]>([]);
const myOrganizationBillingRecap = ref<MyOrganizationBillingRecap>();

onMounted(async () => {
    await getMyOrganizationAdminData()
        .then((data: MyOrganizationAdminDetails) => {
            myOrganizationMembers.value = data.myOrganizationMembers;
            myOrganizationBillingRecap.value = data.myOrganizationBillingRecap;
            console.log(myOrganizationBillingRecap.value)
        })
        .catch(() => {});
});

function addOrganizationMember(user: MyOrganizationMember) {
    myOrganizationMembers.value.push(user);
}

function deleteOrganizationMember(user: MyOrganizationMember) {
    const indexToRemove = myOrganizationMembers.value.findIndex(
        (userToDelete: MyOrganizationMember) => userToDelete.email === user.email
    );

    if (indexToRemove === -1) return;

    myOrganizationMembers.value.splice(indexToRemove, 1);
}
</script>
