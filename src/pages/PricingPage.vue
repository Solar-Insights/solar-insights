<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="'Pricing'"
            />
        </PageSection>

        <PageSection>
            <v-row>
                <PricingCard
                    v-for="i in 4"
                    :pricingCardDetails="{
                        name: `Pro`,
                        description: `For production applications with the option to scale.`,
                        action: `Get Started`
                    }"
                />
            </v-row>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/page_sections/PageContainer.vue';
import PageSection from '@/components/page_sections/PageSection.vue';
import PageTitleContainer from '@/components/page_sections/PageTitleContainer.vue';
import PricingCard from '@/components/pricing/PricingCard.vue';
</script>