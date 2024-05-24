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

        <PageSection>
            <PageSubtitleContainer
                :pageSubtitle="$t(`pricing.pricing-model-subtitle-container.subtitle`)"
                :pageSubtitlePrecision="$t(`pricing.pricing-model-subtitle-container.precision`)"
            >
                <ParagraphContainer
                    class="mx-auto"
                    :paragraphContent="$t(`pricing.pricing-model-subtitle-container.introduction-paragraph.content`)"
                />

                <ParagraphContainer
                    class="mx-auto"
                    :paragraphContent="$t(`pricing.pricing-model-subtitle-container.fixed-costs-paragraph.content`)"
                />

                <ParagraphContainer
                    class="mx-auto"
                    :paragraphContent="$t(`pricing.pricing-model-subtitle-container.variable-costs-paragraph.content`)"
                />
            </PageSubtitleContainer>
        </PageSection>

        <PageSection>
            <PageSubtitleContainer
                id="usage"
                :pageSubtitle="$t(`pricing.usage-pricing-subtitle-container.subtitle`)"
                :pageSubtitlePrecision="$t(`pricing.usage-pricing-subtitle-container.precision`)"
            >
                <ParagraphContainer
                    class="mx-auto"
                    :paragraphContent="$t(`pricing.usage-pricing-subtitle-container.confusion-paragraph.content`)"
                />

                <ParagraphContainer
                    class="mx-auto font-weight-bold"
                    :paragraphContent="
                        $t(`pricing.usage-pricing-subtitle-container.what-is-included-paragraph.content`)
                    "
                >
                    <div class="font-weight-regular">
                        <v-list>
                            <v-list-item
                                v-for="action in incurringActions"
                                prepend-icon="mdi-circle-small"
                                :title="action.title"
                                :subtitle="action.price"
                            />
                        </v-list>
                    </div>
                </ParagraphContainer>

                <ParagraphContainer
                    class="mx-auto font-weight-bold"
                    :paragraphContent="
                        $t(`pricing.usage-pricing-subtitle-container.what-is-not-included-paragraph.content`)
                    "
                >
                    <div class="font-weight-regular">
                        <v-list>
                            <v-list-item
                                v-for="action in nonIncurringActions"
                                prepend-icon="mdi-circle-small"
                                :title="action.title"
                            />
                        </v-list>
                    </div>
                </ParagraphContainer>
            </PageSubtitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "@/components/page_sections/PageContainer.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import PricingCard from "@/components/pricing/PricingCard.vue";
import { PricingCardDetails } from "@/helpers/types";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { priceString } from "@/helpers/util";
import { useUserSessionStore } from "@/stores/userSessionStore";

const t = useI18n().t;
const tm = useI18n().tm;
const userSessionStore = useUserSessionStore();

const pricingCards = computed(() => {
    const pricingCardDetails: PricingCardDetails[] = [
        {
            pricingTier: "starter",
            name: t(`pricing.pricing-cards.starter.name`),
            description: t(`pricing.pricing-cards.starter.description`),
            action: t(`pricing.pricing-cards.starter.action`),
            monthlyStartingPrice: 25,
            benefits: {
                title: t(`pricing.pricing-cards.starter.benefits-title`),
                benefits: [
                    {
                        title: `1 ${t(`pricing.pricing-cards.starter.benefits.users.title`)}`
                    },
                    {
                        title: `100 ${t(`pricing.pricing-cards.starter.benefits.requests.title`)}`
                    },
                    {
                        title: t(`pricing.pricing-cards.starter.benefits.tools.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.starter.benefits.email-support.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.starter.benefits.monthly-usage.title`)
                    },
                ]
            }
        },
        {
            pricingTier: "pro",
            name: t(`pricing.pricing-cards.pro.name`),
            description: t(`pricing.pricing-cards.pro.description`),
            action: t(`pricing.pricing-cards.pro.action`),
            monthlyStartingPrice: 50,
            benefits: {
                title: t(`pricing.pricing-cards.pro.benefits-title`),
                benefits: [
                    {
                        title: `8 ${t(`pricing.pricing-cards.pro.benefits.users.title`)}`,
                        description: `${t(`pricing.pricing-cards.enterprise.benefits.users.description`)} ${priceString(5, userSessionStore.locale)} / ${t(`pricing.pricing-cards.additional-user`)}`
                    },
                    {
                        title: `∞ ${t(`pricing.pricing-cards.pro.benefits.requests.title`)}`
                    },
                    {
                        title: t(`pricing.pricing-cards.pro.benefits.user-detailed-reports.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.pro.benefits.private-discord-support.title`)
                    },
                ]
            }
        },
        {
            pricingTier: "enterprise",
            name: t(`pricing.pricing-cards.enterprise.name`),
            description: t(`pricing.pricing-cards.enterprise.description`),
            action: t(`pricing.pricing-cards.enterprise.action`),
            monthlyStartingPrice: 200,
            benefits: {
                title: t(`pricing.pricing-cards.enterprise.benefits-title`),
                benefits: [
                    {
                        title: `16 ${t(`pricing.pricing-cards.enterprise.benefits.users.title`)}`,
                        description: `${t(`pricing.pricing-cards.enterprise.benefits.users.description`)} ${priceString(5, userSessionStore.locale)} / ${t(`pricing.pricing-cards.additional-user`)}`
                    },
                    {
                        title: t(`pricing.pricing-cards.enterprise.benefits.dedicated-servers.title`)
                    },
                    {
                        title: t(`pricing.pricing-cards.enterprise.benefits.feature-requests.title`)
                    },
                ]
            }
        }
    ];

    return pricingCardDetails;
});

type NonIncurringAction = {
    title: string;
};

const nonIncurringActions = computed(() => {
    return tm(
        `pricing.usage-pricing-subtitle-container.what-is-not-included-paragraph.non-charges`
    ) as NonIncurringAction[];
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
            price: `${priceString(0.15, userSessionStore.locale)} ${t(`pricing.usage-pricing-subtitle-container.what-is-included-paragraph.per-request`)}`
        },
        {
            title: t(`pricing.usage-pricing-subtitle-container.what-is-included-paragraph.charges.additional-users`),
            price: t(`pricing.usage-pricing-subtitle-container.what-is-included-paragraph.depends-on-the-plan`)
        }
    ] as IncurringAction[];
});
</script>
