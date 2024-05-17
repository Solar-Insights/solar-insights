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
                        :itemTitle="$t(`get-started.register-subtitle-container.short-items.invite.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.invite.description`)"
                        :itemIcon="`mdi-account-group-outline`"
                    />
                    <ShortDescriptionItem
                    :itemTitle="$t(`get-started.register-subtitle-container.short-items.share.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.share.description`)"
                        :itemIcon="`mdi-share-outline`"
                    />
                    <ShortDescriptionItem
                    :itemTitle="$t(`get-started.register-subtitle-container.short-items.save.title`)"
                        :itemContent="$t(`get-started.register-subtitle-container.short-items.save.description`)"
                        :itemIcon="`mdi-content-save-plus-outline`"
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
</script>
