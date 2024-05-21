<template>
    <v-col cols="12" xs="12" sm="4" md="3">
        <v-card
            class="pricing-card"
            :class="theme === 'dark' ? 'dark-pricing-card' : 'light-pricing-card'"
            elevation="5"
        >
                <div class="pricing-card-name">{{ props.pricingCardDetails.name }}</div>

                <div class="pricing-card-description">{{ props.pricingCardDetails.description }}</div>

                <v-btn
                    @click="emits('onPricingCardActionClick')"
                    class="pricing-card-action"
                    elevation="2"
                    color="theme"
                >
                    {{ props.pricingCardDetails.action }}
                </v-btn>

            <div>
                <span class="text-h3"> 25$ </span> 
                <span class="detail-text"> / month </span>   
            </div>

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

const emits = defineEmits(["onPricingCardActionClick"]);

</script>