<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`pricing.title`)"
                :pageTitlePrecision="$t(`pricing.precision`)"
            />
        </PageSection>

        <PageSection>
            <v-row class="justify-center">
                <PricingCard
                    v-for="pricingCard in pricingCards"
                    :pricingCardDetails="pricingCard"
                />
            </v-row>
        </PageSection>

        <PageSection>
            <CreateOrganizationForm/>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/page_sections/PageContainer.vue';
import PageSection from '@/components/page_sections/PageSection.vue';
import PageTitleContainer from '@/components/page_sections/PageTitleContainer.vue';
import CreateOrganizationForm from '@/components/pricing/CreateOrganizationForm.vue';
import PricingCard from '@/components/pricing/PricingCard.vue';
import { PricingCardDetails } from '@/helpers/types';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const t = useI18n().t;

const pricingCards = computed(() => {
    return [
        {
            pricingTier: 'starter',
            name: t(`pricing.pricing-cards.starter.name`),
            description: t(`pricing.pricing-cards.starter.description`),
            action: t(`pricing.pricing-cards.starter.action`)
        },
        {
            pricingTier: 'pro',
            name: t(`pricing.pricing-cards.pro.name`),
            description: t(`pricing.pricing-cards.pro.description`),
            action: t(`pricing.pricing-cards.pro.action`)
        },
        {
            pricingTier: 'enterprise',
            name: t(`pricing.pricing-cards.enterprise.name`),
            description: t(`pricing.pricing-cards.enterprise.description`),
            action: t(`pricing.pricing-cards.enterprise.action`)
        },
    ] as PricingCardDetails[];
})
</script>