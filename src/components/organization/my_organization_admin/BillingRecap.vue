<template>
    <BillableCard :title="`Monthly members`">
        <BillableItem
            :title="`Highest count`"
            :value="billingRecap.max_members_count"
        />
        <BillableItem
            :title="`Free available count`"
            :value="billingRecap.max_free_members_count"
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
            :value="billableMembersCount"
        />
        <BillableItem
            :title="`Cost`"
            :value="billableMembersCount * 5"
        />
    </BillableCard>
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

const props = defineProps({
    billingRecap: {
        type: Object as PropType<MyOrganizationBillingRecap>,
        required: true
    }
});
</script>
