<template>
    <PageSubtitleContainer :pageSubtitle="`${steps.length}${t('search.timeline.title')}`">
        <v-timeline class="hidden-sm-and-down mx-auto" density="compact" direction="vertical" style="width: 65%">
            <v-timeline-item
                v-for="(step, i) in steps"
                :key="i"
                class="pl-0 ml-0 pa-0"
                density="compact"
                min-width="100%"
                fill-dot
                dot-color="theme"
                :icon="step.icon"
            >
                <StepCard :i="i" :step="step" />
            </v-timeline-item>
        </v-timeline>
        <div class="hidden-md-and-up">
            <StepCard v-for="(step, i) in steps" :i="i" :step="step" />
        </div>
    </PageSubtitleContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import optimizations_en from "@/assets/images/search/optimizations_en.png";
import panels_section from "@/assets/images/search/panels_section_en.png";
import settings_en from "@/assets/images/search/settings_en.png";
import solar_insights_en from "@/assets/images/search/solar_insights_en.png";
import { useI18n } from "vue-i18n";
import StepCard from "@/components/search/StepCard.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";

const t = useI18n().t;

const steps = ref([
    {
        icon: "mdi-magnify",
        title: t(`search.timeline.step-1.title`),
        contents: [t(`search.timeline.step-1.content-1`), t(`search.timeline.step-1.content-2`)],
        images: []
    },
    {
        icon: "mdi-weather-sunny",
        title: t(`search.timeline.step-2.title`),
        contents: [
            t(`search.timeline.step-2.content-1`),
            t(`search.timeline.step-2.content-2`),
            t(`search.timeline.step-2.content-3`)
        ],
        images: [solar_insights_en]
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
        images: [panels_section]
    },
    {
        icon: "mdi-podium-gold",
        title: t(`search.timeline.step-4.title`),
        contents: [t(`search.timeline.step-4.content-1`), t(`search.timeline.step-4.content-2`)],
        images: [optimizations_en]
    },
    {
        icon: "mdi-map-marker",
        title: t(`search.timeline.step-5.title`),
        contents: [t(`search.timeline.step-5.content-1`), t(`search.timeline.step-5.content-2`)],
        images: [settings_en]
    }
]);
</script>
