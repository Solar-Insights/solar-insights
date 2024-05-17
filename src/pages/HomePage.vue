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
            <v-img v-if="theme === 'dark' && locale === 'en'" class="home-main-image" :src="solar_insights_dark_en" />
            <v-img
                v-else-if="theme === 'dark' && locale === 'fr'"
                class="home-main-image"
                :src="solar_insights_dark_fr"
            />
            <v-img
                v-else-if="theme === 'light' && locale === 'en'"
                class="home-main-image"
                :src="solar_insights_light_en"
            />
            <v-img
                v-else-if="theme === 'light' && locale === 'fr'"
                class="home-main-image"
                :src="solar_insights_light_fr"
            />
        </PageSection>

        <PageSection>
            <PageSubtitleContainer :pageSubtitle="$t(`home.usecase-subtitle-container.subtitle`)">
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.visualize.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.visualize.description`)"
                        :itemIcon="`mdi-telescope`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.customize.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.customize.description`)"
                        :itemIcon="`mdi-hammer`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.viability.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.viability.description`)"
                        :itemIcon="`mdi-cash`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`home.usecase-subtitle-container.collaborate.title`)"
                        :itemContent="$t(`home.usecase-subtitle-container.collaborate.description`)"
                        :itemIcon="`mdi-account-group-outline`"
                    />
                </ShortDescriptionItemsContainer>
            </PageSubtitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import solar_insights_dark_en from "@/assets/images/general/solar_insights_dark_en.png";
import solar_insights_dark_fr from "@/assets/images/general/solar_insights_dark_fr.png";
import solar_insights_light_en from "@/assets/images/general/solar_insights_light_en.png";
import solar_insights_light_fr from "@/assets/images/general/solar_insights_light_fr.png";
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
import router from "@/plugins/router";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import ShortDescriptionItem from "@/components/page_sections/ShortDescriptionItem.vue";
import ShortDescriptionItemsContainer from "@/components/page_sections/ShortDescriptionItemsContainer.vue";

const userSessionStore = useUserSessionStore();
const { locale, theme } = storeToRefs(userSessionStore);
</script>
