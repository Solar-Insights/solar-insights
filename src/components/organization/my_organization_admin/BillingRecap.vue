<template>
    <v-row class="align-stretch">
        <BillableCard :title="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.title`)">
            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-count-and-limit.title`)"
                :precision="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-count-and-limit.precision`)"
                :value="`${dbNumberToDisplayableNumber(billingRecap.building_insights_requests)} (${dbNumberToDisplayableNumber(billingRecap.max_building_insights_requests)})`"
            />
            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.free-limit.title`)"
                :precision="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.free-limit.precision`)"
                :value="dbNumberToDisplayableNumber(billingRecap.max_free_building_insights_requests)"
            />

            <v-divider class="my-2"/>

            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.billable-count.title`)"
                :precision="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.billable-count.precision`)"
                :value="dbNumberToDisplayableNumber(billingRecap.building_insights_requests)"
            />
            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-cost.title`)"
                :precision="`${priceString(PRICE_PER_REQUEST, locale)} ${$t(`my-organization.admin-component.billing-recap-section-container.solar-requests-card.billable-items.current-cost.precision`)}`"
                :value="priceString(requestsCost, locale)"
            />
        </BillableCard>

        <BillableCard :title="$t(`my-organization.admin-component.billing-recap-section-container.users-card.title`)">
            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-count-and-limit.title`)"
                :precision="$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-count-and-limit.precision`)"
                :value="`${dbNumberToDisplayableNumber(billingRecap.members_count)} (${dbNumberToDisplayableNumber(billingRecap.max_members_count)})`"
            />
            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.free-limit.title`)"
                :precision="$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.free-limit.precision`)"
                :value="(billingRecap.max_free_members_count)"
            />

            <v-divider class="my-2"/>

            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.billable-count.title`)"
                :precision="$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.billable-count.precision`)"
                :value="dbNumberToDisplayableNumber(billableMembersCount)"
            />
            <BillableItem
                :title="$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-cost.title`)"
                :precision="`${priceString(PRICE_PER_ADDITIONAL_USER, locale)} ${$t(`my-organization.admin-component.billing-recap-section-container.users-card.billable-items.current-cost.precision`)}`"
                :value="priceString(membersCost, locale)"
            />
        </BillableCard>
    </v-row>
</template>

<script setup lang="ts">
import { MyOrganizationBillingRecap } from '@/helpers/types';
import { computed, PropType } from 'vue';
import { useUserSessionStore } from '@/stores/userSessionStore';
import { storeToRefs } from 'pinia';
import { priceString, dbNumberToDisplayableNumber } from '@/helpers/util';
import { PRICE_PER_REQUEST, PRICE_PER_ADDITIONAL_USER } from '@/helpers/pricingConstants';
import BillableCard from '@/components/organization/my_organization_admin/billable_card/BillableCard.vue';
import BillableItem from '@/components/organization/my_organization_admin/billable_card/BillableItem.vue';

const props = defineProps({
    billingRecap: {
        type: Object as PropType<MyOrganizationBillingRecap>,
        required: true
    }
});

const { locale } = storeToRefs(useUserSessionStore());

const membersCost = computed(() => {
    return PRICE_PER_ADDITIONAL_USER * billableMembersCount.value;
})

const requestsCost = computed(() => {
    return PRICE_PER_REQUEST * props.billingRecap.building_insights_requests;
})

const billableMembersCount = computed(() => {
    if (props.billingRecap.max_free_members_count >= props.billingRecap.members_count) {
        return 0;
    }

    return props.billingRecap.max_members_count - props.billingRecap.max_free_members_count;
})

</script>
