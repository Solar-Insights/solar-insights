<template>
    <div class="home-subtitle-container pt-12">
            <div class="home-subtitle"> {{ steps.length }}{{ $t(`search.timeline.title`) }} </div>
            <div class="home-subtitle-content">
                <v-timeline density="compact">
                    <v-timeline-item
                        v-for="(step, i) in steps"
                        :key="i"
                        min-width="100%"
                        fill-dot
                        dot-color="theme"
                        :icon="step.icon"
                    >
                        <v-card class="rounded-lg" variant="outlined">
                            <v-card-title class="d-flex"> 
                                <div class="mr-6">
                                    {{ i + 1 }}
                                </div>
                                <div>
                                    {{ step.title }}
                                </div>
                            </v-card-title>
                            <v-card-text class="pa-2">
                                <div v-for="content in step.contents" class="pa-2" v-html="content"></div>
                                <v-img v-for="img in step.images" class="mx-auto my-6" :src="img" cover height="300" width="500"/>
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import optimizations_en from "@/assets/images/search/optimizations_en.png";
import panels_section from "@/assets/images/search/panels_section_en.png";
import settings_en from "@/assets/images/search/settings_en.png";
import solar_insights_en from "@/assets/images/search/solar_insights_en.png";
import { useI18n } from 'vue-i18n';

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
        contents: [t(`search.timeline.step-2.content-1`), t(`search.timeline.step-2.content-2`), t(`search.timeline.step-2.content-3`)],
        images: [solar_insights_en]
    },
    {
        icon: "mdi-pencil",
        title: t(`search.timeline.step-3.title`),
        contents: [t(`search.timeline.step-3.content-1`), t(`search.timeline.step-3.content-2`), t(`search.timeline.step-3.content-3`), t(`search.timeline.step-3.content-4`)],
        images: [panels_section]
    },
    {
        icon: "mdi-podium-gold",
        title: t(`search.timeline.step-4.title`),
        contents:  [t(`search.timeline.step-4.content-1`), t(`search.timeline.step-4.content-2`)],
        images: [optimizations_en]
    },
    {
        icon: "mdi-map-marker",
        title: t(`search.timeline.step-4.title`),
        contents:  [t(`search.timeline.step-5.content-1`), t(`search.timeline.step-5.content-2`)],
        images: [settings_en]
    }
]);

</script>