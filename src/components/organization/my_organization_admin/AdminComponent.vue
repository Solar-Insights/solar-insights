<template>
    <div v-if="myOrganizationBillingRecap && myOrganizationMembers">
        <v-divider/>

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

        <PageSection>
            <PageSubtitleContainer
                :subtitle="$t(`my-organization.admin-component.billing-recap-section-container.title`)"
                :precision="`${new Date(myOrganizationBillingRecap.periodStart).toISOString().substring(0, 10)} ${$t(`my-organization.admin-component.billing-recap-section-container.subtitle-to`)} ${new Date(myOrganizationBillingRecap.periodEnd).toISOString().substring(0, 10)} (${$t(`my-organization.admin-component.billing-recap-section-container.subtitle-date-format`)} ${$t(`global.yyyy-mm-dd`)})`"
                :center="false"
            >
                <div class="my-6">
                    <div class="text-h5 my-1">
                        {{ $t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.title`) }}
                    </div>
                    <v-btn
                        @click="router.push({ name: `pricing` })"
                        class="paragraph-action my-1"
                        elevation="2"
                        color="theme"
                        append-icon="mdi-arrow-up-bold-outline"
                    >
                        {{ $t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.upgrade`) }}
                    </v-btn>

                    <BillableCard
                        :title="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.title`)"
                        fullWidth
                    >
                        <BillableItem
                            :title="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.pricing-tier.title`)"
                            :precision="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.pricing-tier.precision`)"
                            :value="$t(`global.${myOrganizationBillingRecap.pricingTier}`)"
                        />

                        <BillableItem
                            :title="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-members.title`)"
                            :precision="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-members.precision`)"
                            :value="myOrganizationBillingRecap.max_free_members_count"
                        />
                        
                        <BillableItem
                            :title="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-requests.title`)"
                            :precision="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-requests.precision`)"
                            :value="myOrganizationBillingRecap.max_free_building_insights_requests"
                        />

                        <v-divider class="my-2"/>

                        <BillableItem
                            :title="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.starting-date.title`)"
                            :precision="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.starting-date.precision`)"
                            :value="myOrganizationBillingRecap.periodStart"
                        />

                        <BillableItem
                            :title="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.ending-date.title`)"
                            :precision="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.ending-date.precision`)"
                            :value="myOrganizationBillingRecap.periodEnd"
                        />
                        
                        <BillableItem
                            :title="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.payment-due-date.title`)"
                            :precision="$t(`my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.payment-due-date.precision`)"
                            :value="myOrganizationBillingRecap.dueDate"
                        />
                    </BillableCard>
                </div>

                <BillingRecap :billingRecap="myOrganizationBillingRecap" />
            </PageSubtitleContainer>
        </PageSection>
    </div>
</template>

<script setup lang="ts">
import { MyOrganizationMember, MyOrganizationAdminDetails, MyOrganizationBillingRecap } from "@/helpers/types";
import { onMounted, ref } from "vue";
import UserTable from "@/components/organization/my_organization_admin/UserTable.vue";
import BillingRecap from "@/components/organization/my_organization_admin//BillingRecap.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import { getMyOrganizationAdminData } from "@/api/user";
import { useRouter } from "vue-router";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import BillableCard from "@/components/organization/my_organization_admin/billable_card/BillableCard.vue";
import BillableItem from "@/components/organization/my_organization_admin/billable_card/BillableItem.vue";

const router = useRouter();

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
