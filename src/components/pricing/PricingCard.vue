<template>
    <v-col cols="12" xs="12" sm="4" md="3">
        <v-card
            class="pricing-card"
            :class="theme === 'dark' ? 'dark-pricing-card' : ''"
            elevation="12"
        >
            <v-card-title>
                <div class="pricing-card-name">{{ props.pricingCardDetails.name }}</div>

                <div class="pricing-card-description">{{ props.pricingCardDetails.description }}</div>
            </v-card-title>
            
            <v-divider></v-divider>

            <v-list-item
                append-icon="mdi-chevron-right"
                lines="two"
                subtitle="Details and agreement"
                link
            ></v-list-item>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { PricingCardDetails } from '@/helpers/types';
import { PropType } from 'vue';
import { useUserSessionStore } from '@/stores/userSessionStore';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useUserSessionStore());

const props = defineProps({
    pricingCardDetails: {
        type: Object as PropType<PricingCardDetails>,
        required: true
    }
});

</script>