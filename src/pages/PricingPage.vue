<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="'Simple and unsurpricing pricing'"
                :pageTitlePrecision="`Pay only for what you need`"
            />
        </PageSection>

        <PageSection>
            <v-row class="justify-center">
                <PricingCard
                    v-for="str in ['Starter', 'Pro', 'Enterprise']"
                    :pricingCardDetails="{
                        pricingTier: str as PricingTier,
                        description: `For production applications with the option to scale.`,
                        action: `Get Started`,
                        benefits: {
                            title: `Get started with`,
                            benefits: [
                                {
                                    title: `Unlimited API requests`
                                }, 
                                {
                                    title: `5 GB bandwidth`,
                                    description: `then $0.125 per GB`
                                }, 
                                {
                                    title: `Community support`
                                }
                            ]
                        }
                    }"
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
import { PricingTier } from '@/helpers/types';
</script>