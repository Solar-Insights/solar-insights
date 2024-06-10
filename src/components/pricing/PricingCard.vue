<template>
    <v-col class="pa-0" cols="12" xs="12" sm="6" md="4">
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
                    @formWasSent="openingRequestSentDialog"
                />
                <CreateOrganizationRequestSent
                    :openDialog="createOrganizationRequestSentDialog"
                    :requesterEmail="requesterEmail"
                    @dialogWasClosed="createOrganizationRequestSentDialog = false"
                />
            </v-btn>

            <div class="pricing-card-container" style="min-height: 100px">
                <div class="detail-text-same-size">{{ $t(`pricing.pricing-cards.from`) }}</div>
                <span class="text-h3">
                    {{ priceString(props.pricingCardDetails.monthlyFixedPrice, userSessionStore.locale) }}
                </span>
                <span class="detail-text-same-size"> / {{ $t(`pricing.pricing-cards.month`) }} </span>
                <span>
                    + <a class="anchor-with-theme" href="javascript:document.getElementById('usage').scrollIntoView(true);"> {{ $t(`pricing.pricing-cards.usage`) }} </a>
                </span>
            </div>

            <v-divider />

            <div class="pricing-card-container">
                <div>{{ props.pricingCardDetails.benefits.title }}</div>
                <v-list class="pricing-card-suggestions-container">
                    <v-list-item 
                        v-for="benefit in props.pricingCardDetails.benefits.benefits" 
                        :class="theme === 'dark' ? 'dark-pricing-card-suggestion' : 'light-pricing-card-suggestion'"
                    >
                        <v-list-item-title class="pricing-card-suggestion-title">
                            {{ benefit.title }}
                        </v-list-item-title>

                        <v-list-item-subtitle 
                            v-if="stringHasValue(benefit.description)"
                            :class="theme === `dark` ? `dark-pricing-card-suggestion-description` : `light-pricing-card-suggestion-description`"
                        >
                            {{ benefit.description }}
                        </v-list-item-subtitle>

                        <template v-slot:prepend>
                            <v-icon color="theme">mdi-check-circle</v-icon>
                        </template>
                    </v-list-item>
                </v-list>
            </div>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { PricingCardDetails } from "@/helpers/types";
import { PropType, ref } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
import { priceString } from "@/helpers/util";
import CreateOrganizationForm from "@/components/pricing/CreateOrganizationForm.vue";
import CreateOrganizationRequestSent from "@/components/pricing/CreateOrganizationRequestSent.vue";
import { stringHasValue } from "@/helpers/componentConditionals";

const userSessionStore = useUserSessionStore();
const { theme } = storeToRefs(userSessionStore);

const props = defineProps({
    pricingCardDetails: {
        type: Object as PropType<PricingCardDetails>,
        required: true
    }
});

const emits = defineEmits(["onPricingCardActionClick"]);

const createOrganizationRequestSentDialog = ref<boolean>(false);
const requesterEmail = ref<string>("");

function openingRequestSentDialog(email: string) {
    requesterEmail.value = email;
    createOrganizationRequestSentDialog.value = true;
}
</script>
