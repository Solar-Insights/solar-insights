<template>
    <v-row class="footer-sections-container">
        <v-col 
            v-for="section, sectionName in sections"
            class="footer-section" 
            cols="12" xs="12" sm="6" md="4"
        >
            <div class="footer-section-title">
                {{ $t(`navigation-sections.${sectionName}`) }}
            </div>

            <div v-for="route in section">
                <div 
                    v-if="!route.requiresAuth || route.requiresAuth && isAuthenticated"
                    class="footer-section-item" 
                >
                    <router-link :to="{ name: route.name}">
                        {{ $t(`navigation.${route.name}`) }}
                    </router-link>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { routes } from '@/helpers/constants';
import { RouteInfo, RouteSection } from '@/helpers/types';
import { ref } from 'vue';
import { useAuth0 } from "@auth0/auth0-vue";

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
    })

    return sectionsGrouping;
}
</script>