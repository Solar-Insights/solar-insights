<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer :pageTitle="$t(`pricing.title`)" :pageTitlePrecision="$t(`pricing.precision`)" />
        </PageSection>

        <PageSection>
            <v-row class="pricing-card-container">
                <PricingCard v-for="pricingCard in pricingCards" :pricingCardDetails="pricingCard" />
            </v-row>
        </PageSection>

        <PageSection id="usage">
            <PageLateralSubtitleContainer
                :subtitle="$t(`pricing.pricing-model-subtitle-container.subtitle`)"
                :precision="$t(`pricing.pricing-model-subtitle-container.precision`)"
            >
                <ParagraphContainer
                    class="mx-auto"
                    :paragraphContent="$t(`pricing.pricing-model-subtitle-container.introduction-paragraph.content`)"
                    :fullWidth="true"
                />

                <ParagraphContainer
                    class="mx-auto"
                    :paragraphContent="$t(`pricing.pricing-model-subtitle-container.fixed-costs-paragraph.content`)"
                    :fullWidth="true"
                />

                <ParagraphContainer
                    class="mx-auto"
                    :paragraphContent="$t(`pricing.pricing-model-subtitle-container.variable-costs-paragraph.content`)"
                    :fullWidth="true"
                />
            </PageLateralSubtitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "@/components/page_sections/PageContainer.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import PageLateralSubtitleContainer from "@/components/page_sections/PageLateralSubtitleContainer.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import PricingCard from "@/components/pricing/PricingCard.vue";
import { PricingCardDetails } from "@/helpers/types";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { priceString } from "@/helpers/util";
import { useUserSessionStore } from "@/stores/userSessionStore";
import {
    STARTER_MONTHLY_FIXED_PRICE,
    PRO_MONTHLY_FIXED_PRICE,
    ENTERPRISE_MONTHLY_FIXED_PRICE,
    STARTER_AVAILABLE_ORG_USERS,
    PRO_AVAILABLE_ORG_USERS,
    ENTERPRISE_AVAILABLE_ORG_USERS,
    STARTER_MONTHLY_ANALYSIS_REQUESTS,
    PRO_MONTHLY_ANALYSIS_REQUESTS,
    PRICE_PER_REQUEST,
    PRICE_PER_ADDITIONAL_USER
} from "@/helpers/pricingConstants";
import { useHead } from "unhead";
import { headSelector, PRICING } from "@/router/routes";

const userSessionStore = useUserSessionStore();

useHead(headSelector(PRICING, userSessionStore.locale));

const t = useI18n().t;

const pricingCards = computed(() => {
    const pricingCardDetails: PricingCardDetails[] = [
        {
            pricingTier: "starter",
            name: t(`pricing.pricing-cards.starter.name`),
            description: t(`pricing.pricing-cards.starter.description`),
            action: t(`pricing.pricing-cards.starter.action`),
            monthlyFixedPrice: STARTER_MONTHLY_FIXED_PRICE,
            benefits: {
                title: t(`pricing.pricing-cards.starter.benefits-title`),
                benefits: [
                    {
                        title: `${STARTER_AVAILABLE_ORG_USERS} ${t(`pricing.pricing-cards.starter.benefits.users.title`)}`
                    },
                    {
                        title: `${STARTER_MONTHLY_ANALYSIS_REQUESTS} ${t(`pricing.pricing-cards.starter.benefits.requests.title`)}`,
                        description: `${t(`pricing.pricing-cards.starter.benefits.requests.description`)} ${priceString(PRICE_PER_REQUEST, userSessionStore.locale)} / ${t(`pricing.pricing-cards.request`)}`
                    },
                    {
                        title: t(`pricing.pricing-cards.starter.benefits.tools.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.starter.benefits.email-support.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.starter.benefits.monthly-usage.title`)
                    }
                ]
            }
        },
        {
            pricingTier: "pro",
            name: t(`pricing.pricing-cards.pro.name`),
            description: t(`pricing.pricing-cards.pro.description`),
            action: t(`pricing.pricing-cards.pro.action`),
            monthlyFixedPrice: PRO_MONTHLY_FIXED_PRICE,
            benefits: {
                title: t(`pricing.pricing-cards.pro.benefits-title`),
                benefits: [
                    {
                        title: `${PRO_AVAILABLE_ORG_USERS} ${t(`pricing.pricing-cards.pro.benefits.users.title`)}`,
                        description: `${t(`pricing.pricing-cards.enterprise.benefits.users.description`)} ${priceString(PRICE_PER_ADDITIONAL_USER, userSessionStore.locale)} / ${t(`pricing.pricing-cards.additional-user`)}`
                    },
                    {
                        title: `${PRO_MONTHLY_ANALYSIS_REQUESTS} ${t(`pricing.pricing-cards.pro.benefits.requests.title`)}`,
                        description: `${t(`pricing.pricing-cards.pro.benefits.requests.description`)} ${priceString(PRICE_PER_REQUEST, userSessionStore.locale)} / ${t(`pricing.pricing-cards.request`)}`
                    },
                    {
                        title: t(`pricing.pricing-cards.pro.benefits.user-detailed-reports.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.pro.benefits.private-discord-support.title`)
                    }
                ]
            }
        },
        {
            pricingTier: "enterprise",
            name: t(`pricing.pricing-cards.enterprise.name`),
            description: t(`pricing.pricing-cards.enterprise.description`),
            action: t(`pricing.pricing-cards.enterprise.action`),
            monthlyFixedPrice: ENTERPRISE_MONTHLY_FIXED_PRICE,
            benefits: {
                title: t(`pricing.pricing-cards.enterprise.benefits-title`),
                benefits: [
                    {
                        title: `${ENTERPRISE_AVAILABLE_ORG_USERS} ${t(`pricing.pricing-cards.enterprise.benefits.users.title`)}`,
                        description: `${t(`pricing.pricing-cards.enterprise.benefits.users.description`)} ${priceString(PRICE_PER_ADDITIONAL_USER, userSessionStore.locale)} / ${t(`pricing.pricing-cards.additional-user`)}`
                    },
                    {
                        title: t(`pricing.pricing-cards.enterprise.benefits.dedicated-servers.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.enterprise.benefits.feature-requests.title`)
                    }
                ]
            }
        }
    ];

    return pricingCardDetails;
});

type IncurringAction = {
    title: string;
    price: number | string;
};

const incurringActions = computed(() => {
    return [
        {
            title: t(
                `pricing.usage-pricing-subtitle-container.what-is-included-paragraph.charges.building-insights-request`
            ),
            price: `${priceString(PRICE_PER_REQUEST, userSessionStore.locale)} ${t(`pricing.usage-pricing-subtitle-container.what-is-included-paragraph.per-request`)}`
        },
        {
            title: t(`pricing.usage-pricing-subtitle-container.what-is-included-paragraph.charges.additional-users`),
            price: t(`pricing.usage-pricing-subtitle-container.what-is-included-paragraph.depends-on-the-plan`)
        }
    ] as IncurringAction[];
});
</script>
