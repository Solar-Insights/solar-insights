<template>
    <v-row class="my-6 pb-5" no-gutters>
        <BillableCard
            :title="
                $t(
                    `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.title`
                )
            "
            :action="{
                text: $t(
                    `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.action`
                ),
                icon: `mdi-arrow-up-bold-outline`
            }"
            @onActionClick="router.push({ name: PRICING.en.name })"
            fullWidth
        >
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.pricing-tier.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.pricing-tier.precision`
                    )
                "
                :value="$t(`global.${billingRecap.pricingTier}`)"
            />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-members.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-members.precision`
                    )
                "
                :value="billingRecap.max_free_members_count"
            />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-requests.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.max-free-requests.precision`
                    )
                "
                :value="billingRecap.max_free_building_insights_requests"
            />

            <v-divider class="my-2" />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.starting-date.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.starting-date.precision`
                    )
                "
                :value="billingRecap.periodStart"
            />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.ending-date.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.ending-date.precision`
                    )
                "
                :value="billingRecap.periodEnd"
            />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.payment-due-date.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.current-plan-details.summary-card.items.payment-due-date.precision`
                    )
                "
                :value="billingRecap.dueDate"
            />
        </BillableCard>
    </v-row>
</template>

<script setup lang="ts">
import { MyOrganizationBillingRecap } from "@/helpers/types";
import { PropType } from "vue";
import { PRICING } from "@/router/routes";
import { useRouter } from "vue-router";
import BillableCard from "@/components/organization/my_organization_admin/billable_card/BillableCard.vue";
import BillableItem from "@/components/organization/my_organization_admin/billable_card/BillableItem.vue";

const router = useRouter();

const props = defineProps({
    billingRecap: {
        type: Object as PropType<MyOrganizationBillingRecap>,
        required: true
    }
});
</script>
