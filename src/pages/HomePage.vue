<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`home.page-title-container.title`)"
                :pageTitlePrecision="$t(`home.page-title-container.description`)"
                :pageTitleAction="{ text: $t(`home.page-title-container.action`), icon: `mdi-send-variant-outline` }"
                @onPageTitleActionClick="router.push({ name: 'pricing' })"
            />
        </PageSection>

        <PageSection>
            <ImageContainer :pcImageSrc="solar_insights_overview" :mobileImageSrc="solar_insights_overview" />
        </PageSection>

        <PageSection>
            <PageSubtitleContainer :pageSubtitle="$t(`home.usecase-subtitle-container.subtitle`)">
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.visualize.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.visualize.description`)"
                        :itemIcon="`mdi-telescope`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.viability.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.viability.description`)"
                        :itemIcon="`mdi-cash`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.customize.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.customize.description`)"
                        :itemIcon="`mdi-hammer`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.collaborate.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.collaborate.description`)"
                        :itemIcon="`mdi-account-group-outline`"
                        :itemIconColor="`theme`"
                    />
                </ShortDescriptionItemsContainer>
            </PageSubtitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import solar_insights_overview from "@/assets/images/home/solar_insights_overview.png";
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
import router from "@/plugins/router";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import ShortDescriptionItem from "@/components/page_sections/ShortDescriptionItem.vue";
import ShortDescriptionItemsContainer from "@/components/page_sections/ShortDescriptionItemsContainer.vue";
import ImageContainer from "@/components/page_sections/ImageContainer.vue";

const userSessionStore = useUserSessionStore();
const { locale, theme } = storeToRefs(userSessionStore);
</script>
