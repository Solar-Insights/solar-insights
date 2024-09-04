<template>
    <PageContainer>
        <!-- <div>
            <LoadingSpinner 
                :size="50"
                :color="`#fcb600`"
            />
        </div> -->
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
                <PageLateralSubtitleContainer :subtitle="`${step.title}`" :icon="step.icon">
                    <ParagraphContainer
                        v-for="paragraph in step.contents"
                        :paragraphContent="paragraph"
                        :fullWidth="true"
                    />

                    <ImageContainer
                        v-if="step.images.pc && step.images.mobile"
                        :pcImageSrc="step.images.pc"
                        :mobileImageSrc="step.images.mobile"
                        :maxWidthPc="500"
                        :minWidthPc="500"
                        :maxHeightPc="500"
                        :minHeightPc="400"
                        :minHeightMobile="500"
                    />
                </PageLateralSubtitleContainer>
            </PageSection>

            <v-divider v-if="index != steps.length - 1" />
        </div>
    </PageContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { LatLng, validCoordinates } from "geo-env-typing/geo";
import AutocompleteField from "@/components/general/AutocompleteField.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useI18n } from "vue-i18n";
import { handleUserState } from "@/composables/users";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import ParagraphContainer from "@/components/page_sections/ParagraphContainer.vue";
import PageLateralSubtitleContainer from "@/components/page_sections/PageLateralSubtitleContainer.vue";
import solar_insights_pc from "@/assets/images/search/solar_insights_pc.webp";
import customize_installation_pc from "@/assets/images/search/customize_installation_pc.webp";
import solar_insights_mobile from "@/assets/images/search/solar_insights_mobile.webp";
import customize_installation_mobile from "@/assets/images/search/customize_installation_mobile.webp";
import ImageContainer from "@/components/page_sections/ImageContainer.vue";
import { useHead } from "unhead";
import { headSelector, SEARCH, SOLAR_MAP } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/general/LoadingSpinner.vue";
import { getReverseGeocoding } from "@/api/geo";
import { useSolarMapStore } from "@/stores/solarMapStore";

const router = useRouter();
const userSessionStore = useUserSessionStore();
const solarMapStore = useSolarMapStore();
const t = useI18n().t;

useHead(headSelector(SEARCH, userSessionStore.locale));

const { loginUser } = handleUserState();

const { isLoading, isAuthenticated } = useAuth0();

async function sendToMap(coords: LatLng, address: string) {
    if (!validCoordinates(coords)) {
        router.push({ name: SEARCH.en.name });
    }

    solarMapStore.address = await getReverseGeocoding(coords)
        .then(async (address: string) => {
            return address;
        })
        .catch((error) => {
            return t(`solar.data-panel.header.reverse-geocoding-error`);
        });

    await solarMapStore
        .syncWithNewRequest(coords)
        .then(() => {
            userSessionStore.setBuildingQueried(coords);
            router.push({ name: SOLAR_MAP.en.name, query: coords });
        })
        .catch((error) => {
            // do something
            console.log(error);
        });
}

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
