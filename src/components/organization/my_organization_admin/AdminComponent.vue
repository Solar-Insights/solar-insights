<template>
    <div v-if="myOrganizationBillingRecap && myOrganizationMembers">
        <v-divider />

        <PageSection>
            <PageSubtitleContainer
                :precontent="$t(`my-organization.admin-component.admin-component-precision`)"
                :subtitle="$t(`my-organization.admin-component.user-table-section-container.title`)"
                :precision="$t(`my-organization.admin-component.user-table-section-container.subtitle`)"
                :center="false"
            >
                <UserTable
                    :users="myOrganizationMembers"
                    @addUser="addOrganizationMember"
                    @deleteUser="deleteOrganizationMember"
                />
            </PageSubtitleContainer>
        </PageSection>

        <v-divider />

        <PageSection>
            <PageSubtitleContainer
                :subtitle="$t(`my-organization.admin-component.billing-recap-section-container.title`)"
                :precision="`${new Date(myOrganizationBillingRecap.periodStart).toISOString().substring(0, 10)} ${$t(`my-organization.admin-component.billing-recap-section-container.subtitle-to`)} ${new Date(myOrganizationBillingRecap.periodEnd).toISOString().substring(0, 10)} (${$t(`my-organization.admin-component.billing-recap-section-container.subtitle-date-format`)} ${$t(`global.yyyy-mm-dd`)})`"
                :center="false"
            >
                <PlanDetails :billingRecap="myOrganizationBillingRecap" />

                <TotalCost :billingRecap="myOrganizationBillingRecap" />

                <MonthlyUsage :billingRecap="myOrganizationBillingRecap" />
            </PageSubtitleContainer>
        </PageSection>
    </div>
</template>

<script setup lang="ts">
import { MyOrganizationMember, MyOrganizationAdminDetails, MyOrganizationBillingRecap } from "@/helpers/types";
import { onMounted, ref } from "vue";
import UserTable from "@/components/organization/my_organization_admin/UserTable.vue";
import PlanDetails from "@/components/organization/my_organization_admin/PlanDetails.vue";
import MonthlyUsage from "@/components/organization/my_organization_admin/MonthlyUsage.vue";
import TotalCost from "@/components/organization/my_organization_admin/TotalCost.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import { getMyOrganizationAdminData } from "@/api/user";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";

const myOrganizationMembers = ref<MyOrganizationMember[]>();
const myOrganizationBillingRecap = ref<MyOrganizationBillingRecap>();

onMounted(async () => {
    await getMyOrganizationAdminData()
        .then((data: MyOrganizationAdminDetails) => {
            myOrganizationMembers.value = data.myOrganizationMembers;
            myOrganizationBillingRecap.value = data.myOrganizationBillingRecap;
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
