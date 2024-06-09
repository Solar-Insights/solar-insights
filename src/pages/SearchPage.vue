<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`search.title`)"
                :pageTitlePrecision="`${steps.length}${$t(`search.precision`)}`"
            >
                <v-skeleton-loader class="search-loader" :loading="isLoading" type="chip">
                    <AutocompleteField
                        v-if="isAuthenticated"
                        :reverseGeocodeOnLoad="false"
                        @sync-with-new-request="sendToMap"
                    />

                    <PageTitleAction
                        v-else
                        :pageTitleAction="{
                            text: `${$t(`search.not-logged-in.action`)}`,
                            icon: `mdi-login`
                        }"
                        @onPageTitleActionClick="loginUser"
                    />
                </v-skeleton-loader>
            </PageTitleContainer>
        </PageSection>

        <div v-for="(step, index) in steps">
            <PageSection>
                <PageSubtitleContainer :pageSubtitle="`${index + 1}. ${step.title}`" :pageSubtitleIcon="step.icon">
                    <ParagraphContainer
                        v-for="paragraph in step.contents"
                        :paragraphContent="paragraph"
                        class="text-center mx-auto text-justify"
                    />

                    <ImageContainer
                        v-for="image in step.images"
                        :pcImageSrc="image"
                        :mobileImageSrc="image"
                        :maxWidth="500"
                    />
                </PageSubtitleContainer>
            </PageSection>

            <v-divider v-if="index + 1 !== steps.length" />
        </div>
    </PageContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import router from "@/plugins/router";
import { LatLng } from "geo-env-typing/geo";
import AutocompleteField from "@/components/general/AutocompleteField.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useI18n } from "vue-i18n";
import { handleUserState } from "@/composables/users";
import PageTitleAction from "@/components/page_sections/PageTitleAction.vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import optimizations_en from "@/assets/images/search/optimizations_en.png";
import panels_section from "@/assets/images/search/panels_section_en.png";
import settings_en from "@/assets/images/search/settings_en.png";
import solar_insights_en from "@/assets/images/search/solar_insights_en.png";
import ImageContainer from "@/components/page_sections/ImageContainer.vue";

const { loginUser } = handleUserState();

const { isLoading, isAuthenticated } = useAuth0();

function sendToMap(coords: LatLng, address: string) {
    router.push({ name: "solar-map", query: coords });
}

const t = useI18n().t;
const steps = computed(() => {
    return [
        {
            icon: "mdi-magnify",
            title: t(`search.timeline.step-1.title`),
            contents: [t(`search.timeline.step-1.content-1`)],
            images: []
        },
        {
            icon: "mdi-weather-sunny",
            title: t(`search.timeline.step-2.title`),
            contents: [t(`search.timeline.step-2.content-1`)],
            images: [solar_insights_en]
        },
        {
            icon: "mdi-pencil",
            title: t(`search.timeline.step-3.title`),
            contents: [
                t(`search.timeline.step-3.content-1`),
                t(`search.timeline.step-3.content-2`),
                t(`search.timeline.step-3.content-3`)
            ],
            images: [panels_section]
        },
        {
            icon: "mdi-podium-gold",
            title: t(`search.timeline.step-4.title`),
            contents: [t(`search.timeline.step-4.content-1`)],
            images: [optimizations_en]
        },
        {
            icon: "mdi-map-marker",
            title: t(`search.timeline.step-5.title`),
            contents: [t(`search.timeline.step-5.content-1`)],
            images: [settings_en]
        },
        {
            icon: "mdi-map-marker",
            title: t(`search.timeline.step-6.title`),
            contents: [t(`search.timeline.step-6.content-1`)],
            images: []
        }
    ];
});
</script>
