<template>
    <v-row class="align-stretch">
        <BillableCard
            v-if="validInformations.requests"
            :title="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.title`)"
        >
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-count-and-limit.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-count-and-limit.precision`
                    )
                "
                :value="`${dbNumberToDisplayableNumber(billingRecap.building_insights_requests)} (${dbNumberToDisplayableNumber(billingRecap.max_building_insights_requests)})`"
            />
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.free-limit.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.free-limit.precision`
                    )
                "
                :value="dbNumberToDisplayableNumber(billingRecap.max_free_building_insights_requests)"
            />

            <v-divider class="my-2" />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.billable-count.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.billable-count.precision`
                    )
                "
                :value="dbNumberToDisplayableNumber(aboveFreeLimits.requests)"
            />
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-cost.title`
                    )
                "
                :precision="`${priceString(billingRecap.building_insights_requests_unit_price_in_cents, locale, true)} ${$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-cost.precision`)}`"
                :value="priceString(totalCosts.requests, locale, true)"
            />
            <ParagraphContainer class="w-100" :paragraphContent="``">
                <div :class="`text-${requestQuota}`">
                    {{
                        $t(
                            `my-organization.admin-component.billing-recap-section-container.solar-requests-card.requests-quota.paragraph-${requestQuota}`
                        )
                    }}
                </div>
            </ParagraphContainer>
        </BillableCard>

        <BillableCard 
            v-if="validInformations.members"
            :title="$t(`my-organization.admin-component.billing-recap-section-container.users-card.title`)"
        >
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-count-and-limit.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-count-and-limit.precision`
                    )
                "
                :value="`${dbNumberToDisplayableNumber(billingRecap.members_count)} (${dbNumberToDisplayableNumber(billingRecap.max_members_count)})`"
            />
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.users-card.billable-items.free-limit.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.users-card.billable-items.free-limit.precision`
                    )
                "
                :value="billingRecap.max_free_members_count"
            />

            <v-divider class="my-2" />

            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.users-card.billable-items.billable-count.title`
                    )
                "
                :precision="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.users-card.billable-items.billable-count.precision`
                    )
                "
                :value="dbNumberToDisplayableNumber(aboveFreeLimits.members)"
            />
            <BillableItem
                :title="
                    $t(
                        `my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-cost.title`
                    )
                "
                :precision="`${priceString(billingRecap.members_unit_price_in_cents, locale, true)} ${$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-cost.precision`)}`"
                :value="priceString(totalCosts.members, locale, true)"
            />
            <ParagraphContainer class="w-100" :paragraphContent="``">
                <div :class="`text-${userQuota}`">
                    {{
                        $t(
                            `my-organization.admin-component.billing-recap-section-container.users-card.user-quota.paragraph-${userQuota}`
                        )
                    }}
                </div>
            </ParagraphContainer>
        </BillableCard>
    </v-row>
</template>

<script setup lang="ts">
import { MyOrganizationBillingRecap } from "@/helpers/types";
import { computed, PropType } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
import { priceString, dbNumberToDisplayableNumber } from "@/helpers/util";
import BillableCard from "@/components/organization/my_organization_admin/billable_card/BillableCard.vue";
import BillableItem from "@/components/organization/my_organization_admin/billable_card/BillableItem.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import { numbersHaveValues } from "@/helpers/componentConditionals";

const props = defineProps({
    billingRecap: {
        type: Object as PropType<MyOrganizationBillingRecap>,
        required: true
    }
});

const { locale } = storeToRefs(useUserSessionStore());

const validInformations = computed(() => {
    return {
        members:numbersHaveValues([
            props.billingRecap.building_insights_requests,
            props.billingRecap.building_insights_requests_unit_price_in_cents,
            props.billingRecap.max_building_insights_requests,
            props.billingRecap.max_free_building_insights_requests
        ]),
        requests: numbersHaveValues([
            props.billingRecap.members_count,
            props.billingRecap.members_unit_price_in_cents,
            props.billingRecap.max_members_count,
            props.billingRecap.max_free_members_count
        ]),
        plan: numbersHaveValues([
            props.billingRecap.plan_count,
            props.billingRecap.plan_unit_price_in_cents
        ]),
    }
})

const aboveFreeLimits = computed(() => {
    return {
        members: props.billingRecap.max_members_count - props.billingRecap.max_free_members_count,
        requests: props.billingRecap.building_insights_requests - props.billingRecap.max_free_building_insights_requests
    }
})

const totalCosts = computed(() => {
    return {
        members: props.billingRecap.members_unit_price_in_cents * aboveFreeLimits.value.members,
        requests: props.billingRecap.building_insights_requests_unit_price_in_cents * aboveFreeLimits.value.requests,
        plan: props.billingRecap.plan_unit_price_in_cents * props.billingRecap.plan_count
    };
})

const requestQuota = computed(() => {
    const belowHalf =
        props.billingRecap.building_insights_requests < props.billingRecap.max_building_insights_requests / 2;
    const atOrAboveLimit =
        props.billingRecap.building_insights_requests >= props.billingRecap.max_building_insights_requests;
        
    if (belowHalf) return "success";
    else if (atOrAboveLimit) return "error";
    else return "warning";
});

const userQuota = computed(() => {
    const aboveFreeLimit: boolean = props.billingRecap.max_members_count > props.billingRecap.max_free_members_count;
    if (aboveFreeLimit) return "warning";
    else return "success";
});
</script>
