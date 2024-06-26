<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer :pageTitle="$t(`catch-all.oops`)" :pageTitlePrecision="$t(`catch-all.404`)">
                <v-btn :to="{ name: 'home' }" class="px-4 mx-4 my-3" color="theme" variant="flat" size="large" rounded>
                    {{ $t(`catch-all.home-button`) }}
                </v-btn>

                <v-btn @click="router.back()" class="px-4 mx-4 my-3" color="theme" variant="flat" size="large" rounded>
                    {{ $t(`catch-all.back-button`) }}
                </v-btn>
            </PageTitleContainer>
        </PageSection>
    </PageContainer>
</template>

<script setup lang="ts">
import router from "@/router/router";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import { useHead } from "unhead";
import { headSelector, NOT_FOUND } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";

const userSessionStore = useUserSessionStore();

useHead(headSelector(NOT_FOUND, userSessionStore.locale));

useHead({
    title: NOT_FOUND.en.head.title,
    meta: NOT_FOUND.en.head.meta,
});
</script>
