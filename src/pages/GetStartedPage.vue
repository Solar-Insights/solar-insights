<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`get-started.page-title-container.title`)"
                :pageTitlePrecision="$t(`get-started.page-title-container.precision`)"
                :pageTitleAction="{ text: $t(`get-started.page-title-container.action`), icon: `mdi-magnify` }"
                @onPageTitleActionClick="router.push({ name: 'search' })"
            />
        </PageSection>

        <PageSection>
            <PageSubtitleContainer
                :pageSubtitle="$t(`get-started.register-subtitle-container.subtitle`)"
                :pageSubtitlePrecision="$t(`get-started.register-subtitle-container.precision`)"
            >
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.register-subtitle-container.short-items.manage.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.manage.description`)"
                        :itemIcon="`mdi-account-group-outline`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.register-subtitle-container.short-items.share.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.share.description`)"
                        :itemIcon="`mdi-share-outline`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.register-subtitle-container.short-items.help.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.help.description`)"
                        :itemIcon="`mdi-account-question-outline`"
                    />
                </ShortDescriptionItemsContainer>

                <ParagraphContainer 
                    class="text-center"
                    :paragraphContent="$t(`get-started.register-subtitle-container.create-an-org-paragraph.content`)"
                    :paragraphAction="{ text: $t(`get-started.register-subtitle-container.create-an-org-paragraph.action`), icon: '' }"
                    @onParagraphActionClick="console.log('do something')"
                />
            </PageSubtitleContainer>
        </PageSection>


        <PageSection>
            <PageSubtitleContainer
                :pageSubtitle="$t(`get-started.use-solar-insights-subtitle-container.subtitle`)"
                :pageSubtitlePrecision="$t(`get-started.use-solar-insights-subtitle-container.precision`)"
            >
            </PageSubtitleContainer>
        </PageSection>

        <PageSection>
            <PageSubtitleContainer
                :pageSubtitle="$t(`get-started.beyond-solar-insights-subtitle-container.subtitle`)"
                :pageSubtitlePrecision="$t(`get-started.beyond-solar-insights-subtitle-container.precision`)"
            >
                <ShortDescriptionItemsContainer>
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.beyond-solar-insights-subtitle-container.short-items.data.title`)"
                        :itemContent="$t(`get-started.beyond-solar-insights-subtitle-container.short-items.data.description`)"
                        :itemIcon="`mdi-database-outline`"
                    />
                    <ShortDescriptionItem
                        :itemTitle="$t(`get-started.beyond-solar-insights-subtitle-container.short-items.graphs.title`)"
                        :itemContent="$t(`get-started.beyond-solar-insights-subtitle-container.short-items.graphs.description`)"
                        :itemIcon="`mdi-chart-line`"
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
import router from "@/plugins/router";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
</script>
