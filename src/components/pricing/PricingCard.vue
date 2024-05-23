<template>
    <v-col cols="12" xs="12" sm="6" md="4">
        <v-card
            class="pricing-card"
            :class="theme === 'dark' ? 'dark-pricing-card' : 'light-pricing-card'"
            elevation="5"
        >
            <div class="pricing-card-title-section">
                <div class="pricing-card-name">{{ props.pricingCardDetails.name }}</div>
                <div class="pricing-card-description">{{ props.pricingCardDetails.description }}</div>
            </div>

            <v-btn
                v-if="[`Coming soon`, `À venir`].includes(props.pricingCardDetails.action)"
                class="pricing-card-action"
                elevation="2"
                color="theme"
            >
                {{ props.pricingCardDetails.action }}
            </v-btn>

            <v-btn
                v-else
                :@click="emits('onPricingCardActionClick')"
                class="pricing-card-action"
                elevation="2"
                color="theme"
            >
                {{ props.pricingCardDetails.action }}
            </v-btn>

            <div class="pricing-card-container">
                <div class="detail-text mb-2"> {{ $t(`pricing.pricing-cards.from`) }} </div>
                <span class="text-h3"> $25 </span> 
                <span class="detail-text"> / {{ $t(`pricing.pricing-cards.month`) }} </span>   
            </div>

            <v-divider/>

            <div class="pricing-card-container">
                <div class="detail-text"> {{ $t(`pricing.pricing-cards.benefits-title`) }} </div>
                <v-list class="my-3 py-0" density="compact">
                    <v-list-item
                        v-for="benefit in $t(`pricing.pricing-cards.${$props.pricingCardDetails.pricingTier}.benefits`)"
                        :class="theme === 'dark' ? 'dark-pricing-color' : ''"
                    >
                        <!-- <v-list-item-title class="detail-text-no-color-change">
                            {{ benefit.title }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="detail-text">
                            {{ benefit.description }}
                        </v-list-item-subtitle>

                        <template v-slot:prepend>
                            <v-icon color="theme">mdi-check-circle-outline</v-icon>
                        </template> -->
                    </v-list-item>
                </v-list>
            </div>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { PricingCardDetails } from '@/helpers/types';
import { PropType } from 'vue';
import { useUserSessionStore } from '@/stores/userSessionStore';
import { storeToRefs } from 'pinia';
import { stringHasValue } from '@/helpers/componentConditionals';

const { theme } = storeToRefs(useUserSessionStore());

const props = defineProps({
    pricingCardDetails: {
        type: Object as PropType<PricingCardDetails>,
        required: true
    }
});

const emits = defineEmits(["onPricingCardActionClick"]);

</script>