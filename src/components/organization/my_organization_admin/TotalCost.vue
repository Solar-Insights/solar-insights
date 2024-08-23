<template>
    <v-row class="my-6 py-5" no-gutters>
        <BillableCard
            :title="
                $t(`my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.title`)
            "
            fullWidth
        >
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.plan-cost.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.plan-cost.precision`
                    )
                "
                :value="priceString(totalCosts.plan, locale, true)"
            />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.requests-cost.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.requests-cost.precision`
                    )
                "
                :value="priceString(totalCosts.requests, locale, true)"
            />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.users-cost.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.users-cost.precision`
                    )
                "
                :value="priceString(totalCosts.members, locale, true)"
            />

            <v-divider class="my-2" />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.total-cost.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.total-costs.total-cost-card.billable-items.total-cost.precision`
                    )
                "
                :value="priceString(totalCosts.total, locale, true)"
            />
        </BillableCard>
    </v-row>
</template>

<script setup lang="ts">
import { MyOrganizationBillingRecap } from "@/helpers/types";
import { computed, PropType } from "vue";
import BillableCard from "@/components/organization/my_organization_admin/billable_card/BillableCard.vue";
import BillableItem from "@/components/organization/my_organization_admin/billable_card/BillableItem.vue";
import { priceString, getNumbersAboveFreeLimits, getTotalCosts } from "@/helpers/util";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";

const userSessionStore = useUserSessionStore();

const props = defineProps({
    billingRecap: {
        type: Object as PropType<MyOrganizationBillingRecap>,
        required: true
    }
});

const { locale } = storeToRefs(userSessionStore);

const totalCosts = computed(() => getTotalCosts(props.billingRecap, getNumbersAboveFreeLimits(props.billingRecap)));
</script>
