<template>
    <PageSection
        v-if="myOrganizationBillingRecap" 
        :pageSectionTitle="$t(`my-organization.admin-component.billing-recap-section-container.title`)"
        :pageSectionSubtitle="`${$t(`my-organization.admin-component.billing-recap-section-container.subtitle`)} ${new Date(myOrganizationBillingRecap!.billingDate).toISOString().substring(0, 10)} (${$t(`global.yyyy-mm-dd`)})`"
    >
        <BillingRecap :billingRecap="myOrganizationBillingRecap"/>
    </PageSection>

    <PageSection
        v-if="myOrganizationMembers"
        :pageSectionTitle="$t(`my-organization.admin-component.user-table-section-container.title`)"
        :pageSectionSubtitle="$t(`my-organization.admin-component.user-table-section-container.subtitle`)"
    >
        <UserTable 
            :users="myOrganizationMembers" 
            @addUser="addOrganizationMember" 
            @deleteUser="deleteOrganizationMember" 
        />
    </PageSection>
</template>

<script setup lang="ts">
import { MyOrganizationMember, MyOrganizationAdminDetails, MyOrganizationBillingRecap } from "@/helpers/types";
import { onMounted, ref } from "vue";
import UserTable from "@/components/organization/my_organization_admin/UserTable.vue";
import BillingRecap from "@/components/organization/my_organization_admin//BillingRecap.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import { getMyOrganizationAdminData } from "@/api/user";

const myOrganizationMembers = ref<MyOrganizationMember[]>();
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
    myOrganizationMembers.value!.push(user);
}

function deleteOrganizationMember(user: MyOrganizationMember) {
    const indexToRemove = myOrganizationMembers.value!.findIndex(
        (userToDelete: MyOrganizationMember) => userToDelete.email === user.email
    );

    if (indexToRemove === -1) return;

    myOrganizationMembers.value!.splice(indexToRemove, 1);
}
</script>
