<template>
    <PageContainer>
        <PageSection>
            <PageTitleContainer
                :pageTitle="$t(`search.title`)"
                :pageTitlePrecision="`${steps.length}${$t(`search.precision`)}`"
                :pageTitleAction="
                    !isAuthenticated && !isLoading
                        ? {
                              text: `${$t(`search.not-logged-in.action`)}`,
                              icon: `mdi-login`
                          }
                        : undefined
                "
                @onPageTitleActionClick="loginUser"
            >
                <v-skeleton-loader class="search-loader mt-7" :loading="isLoading" type="chip">
                    <AutocompleteField
                        v-if="isAuthenticated"
                        :reverseGeocodeOnLoad="false"
                        @sync-with-new-request="sendToMap"
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
                        v-if="step.images.pc && step.images.mobile"
                        :pcImageSrc="step.images.pc"
                        :mobileImageSrc="step.images.mobile"
                        :maxWidthPc="800"
                        :maxHeightPc="600"
                    />
                </PageSubtitleContainer>
            </PageSection>

            <v-divider v-if="index + 1 !== steps.length" />
        </div>
    </PageContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import router from "@/router/router";
import { LatLng } from "geo-env-typing/geo";
import AutocompleteField from "@/components/general/AutocompleteField.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useI18n } from "vue-i18n";
import { handleUserState } from "@/composables/users";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import solar_insights_pc from "@/assets/images/search/solar_insights_pc.png";
import customize_installation_pc from "@/assets/images/search/customize_installation_pc.png";
import solar_insights_mobile from "@/assets/images/search/solar_insights_mobile.png";
import customize_installation_mobile from "@/assets/images/search/customize_installation_mobile.png";
import ImageContainer from "@/components/page_sections/ImageContainer.vue";
import { useHead } from "unhead";
import { SEARCH } from "@/router/routes";

useHead({
    title: SEARCH.en.head.title,
    meta: SEARCH.en.head.meta,
});

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
            images: {}
        },
        {
            icon: "mdi-weather-sunny",
            title: t(`search.timeline.step-2.title`),
            contents: [t(`search.timeline.step-2.content-1`)],
            images: {
                pc: solar_insights_pc,
                mobile: solar_insights_mobile
            }
        },
        {
            icon: "mdi-pencil",
            title: t(`search.timeline.step-3.title`),
            contents: [
                t(`search.timeline.step-3.content-1`),
                t(`search.timeline.step-3.content-2`),
                t(`search.timeline.step-3.content-3`),
                t(`search.timeline.step-3.content-4`)
            ],
            images: {
                pc: customize_installation_pc,
                mobile: customize_installation_mobile
            }
        },
        {
            icon: "mdi-share",
            title: t(`search.timeline.step-4.title`),
            contents: [t(`search.timeline.step-4.content-1`)],
            images: {}
        }
    ];
});
</script>
