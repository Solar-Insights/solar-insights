<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`get-started.page-title-container.title`)"
                :pageTitlePrecision="$t(`get-started.page-title-container.precision`)"
                :pageTitleAction="{
                    text: $t(`get-started.page-title-container.action`),
                    icon: `mdi-weather-sunny`
                }"
                @onPageTitleActionClick="router.push({ name: 'search' })"
            />
        </PageSection>

        <PageSection>
            <PageSubtitleContainer
                :subtitle="$t(`get-started.choose-a-plan-subtitle-container.subtitle`)"
                :precision="$t(`get-started.choose-a-plan-subtitle-container.precision`)"
                :action="{
                    text: $t(`get-started.choose-a-plan-subtitle-container.create-an-org-paragraph.action`),
                    icon: `mdi-currency-usd`
                }"
                @onActionClick="router.push({ name: 'pricing' })"
            >
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        :itemTitle="$t(`pricing.pricing-cards.starter.name`)"
                        :itemContent="$t(`pricing.pricing-cards.starter.description`)"
                        :itemIcon="`mdi-account-outline`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`pricing.pricing-cards.pro.name`)"
                        :itemContent="$t(`pricing.pricing-cards.pro.description`)"
                        :itemIcon="`mdi-account-multiple-outline`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`pricing.pricing-cards.enterprise.name`)"
                        :itemContent="$t(`pricing.pricing-cards.enterprise.description`)"
                        :itemIcon="`mdi-account-group-outline`"
                        :itemIconColor="`theme`"
                    />
                </ShortDescriptionItemsContainer>
            </PageSubtitleContainer>
        </PageSection>

        <v-divider />

        <PageSection>
            <PageSubtitleContainer
                :subtitle="$t(`get-started.register-subtitle-container.subtitle`)"
                :precision="$t(`get-started.register-subtitle-container.precision`)"
            >
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.register-subtitle-container.short-items.manage.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.manage.description`)"
                        :itemIcon="`mdi-account-group-outline`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.register-subtitle-container.short-items.share.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.share.description`)"
                        :itemIcon="`mdi-share-outline`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.register-subtitle-container.short-items.help.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.help.description`)"
                        :itemIcon="`mdi-account-question-outline`"
                        :itemIconColor="`theme`"
                    />
                </ShortDescriptionItemsContainer>
            </PageSubtitleContainer>
        </PageSection>

        <v-divider />

        <PageSection>
            <PageSubtitleContainer
                :subtitle="$t(`get-started.use-solar-insights-subtitle-container.subtitle`)"
                :precision="$t(`get-started.use-solar-insights-subtitle-container.precision`)"
            >
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        v-if="!isAuthenticated"
                        :itemTitle="$t(`get-started.use-solar-insights-subtitle-container.short-items.new-org.title`)"
                        :itemContent="
                            $t(`get-started.use-solar-insights-subtitle-container.short-items.new-org.description`)
                        "
                        :itemIcon="`mdi-account-outline`"
                        :itemIconColor="`theme`"
                        :itemAction="{
                            text: $t('get-started.use-solar-insights-subtitle-container.short-items.new-org.action'),
                            icon: `mdi-login`
                        }"
                        @onItemActionClick="loginUser"
                    />
                    <ShortDescriptionItem
                        :itemTitle="
                            $t(`get-started.use-solar-insights-subtitle-container.short-items.start-using.title`)
                        "
                        :itemContent="
                            $t(`get-started.use-solar-insights-subtitle-container.short-items.start-using.description`)
                        "
                        :itemIcon="`mdi-play`"
                        :itemIconColor="`theme`"
                        :itemAction="{
                            text: $t(
                                'get-started.use-solar-insights-subtitle-container.short-items.start-using.action'
                            ),
                            icon: `mdi-weather-sunny`
                        }"
                        @onItemActionClick="router.push({ name: `search` })"
                    />
                </ShortDescriptionItemsContainer>
            </PageSubtitleContainer>
        </PageSection>

        <v-divider />

        <PageSection>
            <PageSubtitleContainer
                :subtitle="$t(`get-started.beyond-solar-insights-subtitle-container.subtitle`)"
                :precision="$t(`get-started.beyond-solar-insights-subtitle-container.precision`)"
            >
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.beyond-solar-insights-subtitle-container.short-items.data.title`)"
                        :itemContent="
                            $t(`get-started.beyond-solar-insights-subtitle-container.short-items.data.description`)
                        "
                        :itemIcon="`mdi-database-outline`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.beyond-solar-insights-subtitle-container.short-items.graphs.title`)"
                        :itemContent="
                            $t(`get-started.beyond-solar-insights-subtitle-container.short-items.graphs.description`)
                        "
                        :itemIcon="`mdi-chart-line`"
                        :itemIconColor="`theme`"
                    />
                </ShortDescriptionItemsContainer>
            </PageSubtitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import PageSection from "@/components/page_sections/PageSection.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import ShortDescriptionItem from "@/components/page_sections/ShortDescriptionItem.vue";
import ShortDescriptionItemsContainer from "@/components/page_sections/ShortDescriptionItemsContainer.vue";
import router from "@/router/router";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { handleUserState } from "@/composables/users";
import { useHead } from "unhead";
import { GET_STARTED, headSelector } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";

const userSessionStore = useUserSessionStore();

useHead(headSelector(GET_STARTED, userSessionStore.locale));

const { loginUser } = handleUserState();
const { isAuthenticated } = useAuth0();
</script>
