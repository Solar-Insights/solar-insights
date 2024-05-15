<template>
    <v-card class="pt-0 body-container">
        <PageTitleContainer
            :pageTitle="$t(`home.page-title-container.title`)"
            :pageTitlePrecision="$t(`home.page-title-container.description`)"
            :pageTitleAction="{ text: $t(`home.page-title-container.action`), icon: `mdi-magnify` }"
            @onPageTitleActionClick="router.push({ name: 'search' })"
        />

        <v-img v-if="theme === 'dark' && locale === 'en'" class="home-main-image" :src="solar_insights_dark_en" />
        <v-img v-else-if="theme === 'dark' && locale === 'fr'" class="home-main-image" :src="solar_insights_dark_fr" />
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

        <div class="home-subtitle-container">
            <div class="home-subtitle">{{ $t(`home.usecase-subtitle-container.subtitle`) }}</div>
            <div class="home-subtitle-content">
                <v-row>
                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3">
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-telescope</v-icon>
                        <div class="font-weight-bold mb-3">
                            {{ $t(`home.usecase-subtitle-container.visualize.title`) }}
                        </div>
                        <div>
                            {{ $t(`home.usecase-subtitle-container.visualize.description`) }}
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3">
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-hammer</v-icon>
                        <div class="font-weight-bold mb-3">
                            {{ $t(`home.usecase-subtitle-container.customize.title`) }}
                        </div>
                        <div>
                            {{ $t(`home.usecase-subtitle-container.customize.description`) }}
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3">
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-cash</v-icon>
                        <div class="font-weight-bold mb-3">
                            {{ $t(`home.usecase-subtitle-container.viability.title`) }}
                        </div>
                        <div>
                            {{ $t(`home.usecase-subtitle-container.viability.description`) }}
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3">
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-earth</v-icon>
                        <div class="font-weight-bold mb-3">
                            {{ $t(`home.usecase-subtitle-container.global.title`) }}
                        </div>
                        <div>
                            {{ $t(`home.usecase-subtitle-container.global.description`) }}
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import solar_insights_dark_en from "@/assets/images/general/solar_insights_dark_en.png";
import solar_insights_dark_fr from "@/assets/images/general/solar_insights_dark_fr.png";
import solar_insights_light_en from "@/assets/images/general/solar_insights_light_en.png";
import solar_insights_light_fr from "@/assets/images/general/solar_insights_light_fr.png";
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
import router from "@/plugins/router";
import PageTitleContainer from "@/components/general/PageTitleContainer.vue";

const userSessionStore = useUserSessionStore();
const { locale, theme } = storeToRefs(userSessionStore);
</script>
