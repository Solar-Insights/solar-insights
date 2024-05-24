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
                <CreateOrganizationForm
                    :pricingTier="props.pricingCardDetails.pricingTier"
                    :pricingName="props.pricingCardDetails.name"
                />
            </v-btn>

            <div class="pricing-card-container" style="min-height: 150px">
                <div class="detail-text-same-size">{{ $t(`pricing.pricing-cards.from`) }}</div>
                <span class="text-h3">
                    {{ priceString(props.pricingCardDetails.monthlyStartingPrice, userSessionStore.locale) }}
                </span>
                <span class="detail-text-same-size"> / {{ $t(`pricing.pricing-cards.month`) }} </span>
                <span>
                    + <a class="anchor-with-theme" href="javascript:document.getElementById('usage').scrollIntoView(true);"> {{ $t(`pricing.pricing-cards.usage`) }} </a>
                </span>

                <div class="mt-3">
                    {{ props.pricingCardDetails.maxNbOfUsers }} {{ $t(`pricing.pricing-cards.users-included`) }}
                </div>
                <div v-if="props.pricingCardDetails.pricePerAdditionalUser !== undefined" class="detail-text-same-size">
                    {{ priceString(props.pricingCardDetails.pricePerAdditionalUser, userSessionStore.locale) }} /
                    {{ $t(`pricing.pricing-cards.additional-user`) }}
                </div>
            </div>

            <v-divider />

            <div class="pricing-card-container">
                <div class="detail-text">{{ $t(`pricing.pricing-cards.benefits-title`) }}</div>
                <v-list class="my-3 py-0" density="compact">
                    <v-list-item v-for="benefit in benefits" :class="theme === 'dark' ? 'dark-pricing-color' : ''">
                        <v-list-item-title class="detail-text-no-color-change">
                            {{ benefit.title }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="detail-text">
                            {{ benefit.description }}
                        </v-list-item-subtitle>

                        <template v-slot:prepend>
                            <v-icon color="theme">mdi-check-circle-outline</v-icon>
                        </template>
                    </v-list-item>
                </v-list>
            </div>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { PricingCardDetails, PricingCardSingleBenefit } from "@/helpers/types";
import { computed, PropType } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { priceString } from "@/helpers/util";
import CreateOrganizationForm from "@/components/pricing/CreateOrganizationForm.vue";

const tm = useI18n().tm;
const userSessionStore = useUserSessionStore();
const { theme } = storeToRefs(userSessionStore);

const props = defineProps({
    pricingCardDetails: {
        type: Object as PropType<PricingCardDetails>,
        required: true
    }
});

const emits = defineEmits(["onPricingCardActionClick"]);

const benefits = computed(() => {
    return tm(`pricing.pricing-cards.${props.pricingCardDetails.pricingTier}.benefits`) as PricingCardSingleBenefit[];
});
</script>
