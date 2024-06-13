<template>
    <v-row style="align-items: stretch !important">
        <BillableCard :title="`Solar installation analysis requests`">
            <BillableItem
                :title="`Limit`"
                :precision="`Maximum number of requests made every month`"
                :value="maxRequestCount"
            />
            <BillableItem
                :title="`Current count`"
                :precision="`Resets monthly`"
                :value="billingRecap.building_insights_requests"
            />
            <v-progress-linear
                class="mt-4 mb-6"
                color="theme"
                height="10"
                :model-value="(billingRecap.building_insights_requests / billingRecap.max_building_insights_requests) * 100"
                rounded="pill"
            />

            <v-divider class="my-2"/>

            <BillableItem
                :title="`Billable count`"
                :precision="`Number of requests billed at the end of the current month`"
                :value="billingRecap.building_insights_requests"
            />
            <BillableItem
                :title="`Cost`"
                :precision="`x per request`"
                :value="billingRecap.building_insights_requests * 0.15"
            />
        </BillableCard>

        <BillableCard :title="`Monthly members`">
            <BillableItem
                :title="`Free available count`"
                :precision="`Number of free users`"
                :value="billingRecap.max_free_members_count"
            />
            <BillableItem
                :title="`Current count`"
                :precision="`Resets monthly`"
                :value="billingRecap.building_insights_requests"
            />
            <BillableItem
                :title="`Highest count`"
                :precision="`Most amount at any point during the month`"
                :value="billingRecap.max_members_count"
            />
            <v-progress-linear
                class="mt-4 mb-6"
                color="theme"
                height="10"
                :model-value="(billingRecap.max_members_count / billingRecap.max_free_members_count) * 100"
                rounded="pill"
            />

            <v-divider class="my-2"/>
            
            <BillableItem
                :title="`Billable count`"
                :precision="`Difference between highest and free available count`"
                :value="billableMembersCount"
            />
            <BillableItem
                :title="`Cost`"
                :precision="`x per additional member`"
                :value="billableMembersCount * 5"
            />
        </BillableCard>
    </v-row>
</template>

<script setup lang="ts">
import { MyOrganizationBillingRecap } from '@/helpers/types';
import { computed, PropType } from 'vue';
import BillableCard from '@/components/organization/my_organization_admin/billable_card/BillableCard.vue';
import BillableItem from '@/components/organization/my_organization_admin/billable_card/BillableItem.vue';

const billableMembersCount = computed(() => {
    if (props.billingRecap.max_free_members_count >= props.billingRecap.max_members_count) {
        return 0;
    }

    return props.billingRecap.max_members_count - props.billingRecap.max_free_members_count;
})

const maxRequestCount = computed(() => {
    if (props.billingRecap.max_building_insights_requests == 2147483647) {
        return "∞"
    }

    return props.billingRecap.max_building_insights_requests;
})

const props = defineProps({
    billingRecap: {
        type: Object as PropType<MyOrganizationBillingRecap>,
        required: true
    }
});
</script>
