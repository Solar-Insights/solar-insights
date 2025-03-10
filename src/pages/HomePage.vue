<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`home.page-title-container.title`)"
                :pageTitlePrecision="$t(`home.page-title-container.description`)"
                :pageTitleAction="{ text: $t(`home.page-title-container.action`), icon: `mdi-rocket-launch-outline` }"
                @onPageTitleActionClick="router.push({ name: GET_STARTED.en.name })"
            />
        </PageSection>

        <PageSection>
            <ImageContainer
                :pcImageSrc="solar_map_pc"
                :mobileImageSrc="solar_map_mobile"
                :minHeightPc="450"
                :minHeightMobile="400"
            />
        </PageSection>

        <PageSection>
            <PageSubtitleContainer :subtitle="$t(`home.usecase-subtitle-container.subtitle`)">
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        cols="12"
                        xs="12"
                        sm="6"
                        md="6"
                        :itemTitle="$t(`home.usecase-subtitle-container.visualize.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.visualize.description`)"
                        :itemIcon="`mdi-telescope`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        cols="12"
                        xs="12"
                        sm="6"
                        md="6"
                        :itemTitle="$t(`home.usecase-subtitle-container.viability.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.viability.description`)"
                        :itemIcon="`mdi-cash`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        cols="12"
                        xs="12"
                        sm="6"
                        md="6"
                        :itemTitle="$t(`home.usecase-subtitle-container.customize.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.customize.description`)"
                        :itemIcon="`mdi-hammer`"
                        :itemIconColor="`theme`"
                    />
                    <ShortDescriptionItem
                        cols="12"
                        xs="12"
                        sm="6"
                        md="6"
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
                    @onParagraphActionClick="router.push({ name: PRICING.en.name })"
                />
            </PageSubtitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
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
import { headSelector, HOME, GET_STARTED, PRICING } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userSessionStore = useUserSessionStore();

useHead(headSelector(HOME, userSessionStore.locale));
</script>
