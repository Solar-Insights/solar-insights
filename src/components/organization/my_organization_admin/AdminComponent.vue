<template>
    <div v-if="myOrganizationBillingRecap && myOrganizationMembers">
        <PageSection
            :pageSectionTitle="$t(`my-organization.admin-component.billing-recap-section-container.title`)"
            :pageSectionSubtitle="`${$t(`my-organization.admin-component.billing-recap-section-container.subtitle`)} ${new Date(myOrganizationBillingRecap!.billingDate).toISOString().substring(0, 10)} (${$t(`global.yyyy-mm-dd`)})`"
        >
            <div class="my-10">
                <div class="text-h6 my-1">
                    {{ $t(`my-organization.admin-component.billing-recap-section-container.pricing-plan`) }}
                    <span class="font-weight-black">
                        {{ $t(`global.${myOrganizationBillingRecap.pricingTier}`) }}
                    </span>
                </div>
                
                <v-btn
                    @click="$router.push({ name: `pricing` })"
                    class="paragraph-action my-1"
                    elevation="2"
                    color="theme"
                    append-icon="mdi-arrow-up-bold-outline"
                >
                    {{ $t(`my-organization.admin-component.billing-recap-section-container.upgrade`) }}
                </v-btn>
            </div>
            

            <BillingRecap 
                :billingRecap="myOrganizationBillingRecap"
                :membersCount="myOrganizationMembers.length"
            />
        </PageSection>

        <PageSection
            :pageSectionTitle="$t(`my-organization.admin-component.user-table-section-container.title`)"
            :pageSectionSubtitle="$t(`my-organization.admin-component.user-table-section-container.subtitle`)"
        >
            <UserTable 
                :users="myOrganizationMembers"
                :userCountSummary="userCountSummary"
                @addUser="addOrganizationMember" 
                @deleteUser="deleteOrganizationMember" 
            />
        </PageSection>
    </div>
</template>

<script setup lang="ts">
import { MyOrganizationMember, MyOrganizationAdminDetails, MyOrganizationBillingRecap, UserCountSummary } from "@/helpers/types";
import { computed, onMounted, ref } from "vue";
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

const userCountSummary = computed(() => {
    if (!myOrganizationBillingRecap.value || !myOrganizationMembers.value) return;

    const userCountSummary: UserCountSummary = {
        belowFreeLimit: myOrganizationMembers.value.length < myOrganizationBillingRecap.value.max_free_members_count,
        atHighestCount: myOrganizationMembers.value.length === myOrganizationBillingRecap.value.max_members_count
    }

    return userCountSummary;
});
</script>
