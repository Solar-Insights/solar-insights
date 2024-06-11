<template>
    <div>
        {{ billingRecap }}
    </div>
</template>

<script setup lang="ts">
import { MyOrganizationBillingRecap } from '@/helpers/types';
import { PropType } from 'vue';

const props = defineProps({
    billingRecap: {
        type: Object as PropType<MyOrganizationBillingRecap>,
        required: true
    }
});
</script>
