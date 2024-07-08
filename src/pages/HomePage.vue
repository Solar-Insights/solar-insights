<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`home.page-title-container.title`)"
                :pageTitlePrecision="$t(`home.page-title-container.description`)"
                :pageTitleAction="{ text: $t(`home.page-title-container.action`), icon: `mdi-rocket-launch-outline` }"
                @onPageTitleActionClick="router.push({ name: 'get-started' })"
            />
        </PageSection>

        <PageSection>
            <ImageContainer :pcImageSrc="solar_map_pc" :mobileImageSrc="solar_map_mobile" />
        </PageSection>

        <PageSection>
            <PageSubtitleContainer
                :pageSubtitle="$t(`home.usecase-subtitle-container.subtitle`)"
            >
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

                <ParagraphContainer
                    class="text-center mx-auto"
                    :paragraphContent="``"
                    :paragraphAction="{
                        text: $t(`home.usecase-subtitle-container.action`),
                        icon: `mdi-send-variant-outline`
                    }"
                    @onParagraphActionClick="router.push({ name: 'pricing' })"
                />
            </PageSubtitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import router from "@/router/router";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import ShortDescriptionItem from "@/components/page_sections/ShortDescriptionItem.vue";
import ShortDescriptionItemsContainer from "@/components/page_sections/ShortDescriptionItemsContainer.vue";
import ImageContainer from "@/components/page_sections/ImageContainer.vue";
import solar_map_pc from "@/assets/images/home/solar_map_pc.webp";
import solar_map_mobile from "@/assets/images/home/solar_map_mobile.webp";
import { useHead } from "unhead";
import { headSelector, HOME } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";

const userSessionStore = useUserSessionStore();

useHead(headSelector(HOME, userSessionStore.locale));
</script>
