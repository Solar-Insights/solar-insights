<template>
    <v-row class="footer-sitemap-container">
        <v-col
            v-for="(section, sectionName) in sections"
            class="footer-section hidden-xs"
            cols="12"
            xs="12"
            sm="6"
            md="4"
        >
            <div class="footer-section-title">
                {{ $t(`navigation-sections.${sectionName}`) }}
            </div>

            <div v-for="route in section">
                <FooterRouteLink :route="route" :isAuthenticated="isAuthenticated" />
            </div>
        </v-col>

        <v-col class="footer-section hidden-sm-and-up">
            <v-expansion-panels class="hidden-sm-and-up" variant="accordion">
                <v-expansion-panel v-for="(section, sectionName, index) in sections" :key="index" elevation="0">
                    <v-expansion-panel-title class="font-weight-regular" static>
                        {{ $t(`navigation-sections.${sectionName}`) }}
                    </v-expansion-panel-title>

                    <v-expansion-panel-text class="ml-4">
                        <div v-for="route in section">
                            <FooterRouteLink :route="route" :isAuthenticated="isAuthenticated" />
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { routes } from "@/helpers/constants";
import { RouteInfo, RouteSection } from "@/helpers/types";
import { ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import FooterRouteLink from "@/components/general/footer/FooterRouteLink.vue";

const { isAuthenticated } = useAuth0();

type SectionsGrouping = {
    [key in RouteSection]?: RouteInfo[];
};

const sections = ref<SectionsGrouping>(groupRoutesBySection());

function groupRoutesBySection() {
    const sectionsGrouping: SectionsGrouping = {};
    routes.forEach((route) => {
        if (sectionsGrouping[route.section] !== undefined) {
            sectionsGrouping[route.section]!.push(route);
        } else {
            sectionsGrouping[route.section] = [route];
        }
    });

    return sectionsGrouping;
}
</script>
