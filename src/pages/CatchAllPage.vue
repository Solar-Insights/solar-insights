<template>
    <PageSection>
        <PageTitleContainer
            :pageTitle="$t(`catch-all.oops`)"
            :pageTitlePrecision="$t(`catch-all.404`)"
        >
            <v-btn :to="{ name: 'home' }" class="px-4 mx-4 my-3" color="theme" variant="flat" size="large" rounded>
                {{ $t(`catch-all.home-button`) }}
            </v-btn>

            <v-btn @click="router.back()" class="px-4 mx-4 my-3" color="theme" variant="flat" size="large" rounded>
                {{ $t(`catch-all.back-button`) }}
            </v-btn>
        </PageTitleContainer>
    </PageSection>
</template>

<script setup lang="ts">
import router from "@/plugins/router";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
</script>
