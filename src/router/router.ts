import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import { HOME, SEARCH, SOLAR_MAP, GET_STARTED, MY_ORGANIZATION, PRICING, CONTACT, CALLBACK, NOT_FOUND } from "@/router/routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    routes: [
        {
            path: HOME.en.path,
            name: HOME.en.name,
            component: () => import("@/pages/HomePage.vue"),
            beforeEnter: []
        },
        {
            path: SEARCH.en.path,
            name: SEARCH.en.name,
            component: () => import("@/pages/SearchPage.vue"),
            beforeEnter: []
        },
        {
            path: SOLAR_MAP.en.path,
            name: SOLAR_MAP.en.name,
            component: () => import("@/pages/SolarMapPage.vue"),
            beforeEnter: [authGuard]
        },
        {
            path: GET_STARTED.en.path,
            name: GET_STARTED.en.name,
            component: () => import("@/pages/GetStartedPage.vue"),
            beforeEnter: []
        },
        {
            path: MY_ORGANIZATION.en.path,
            name: MY_ORGANIZATION.en.name,
            component: () => import("@/pages/MyOrganizationPage.vue"),
            beforeEnter: [authGuard]
        },
        {
            path: PRICING.en.path,
            name: PRICING.en.name,
            component: () => import("@/pages/PricingPage.vue"),
            beforeEnter: []
        },
        {
            path: CONTACT.en.path,
            name: CONTACT.en.name,
            component: () => import("@/pages/ContactPage.vue"),
            beforeEnter: []
        },
        {
            path: CALLBACK.en.path,
            name: CALLBACK.en.name,
            component: () => import("@/pages/CallbackPage.vue"),
            beforeEnter: []
        },
        {
            path: NOT_FOUND.en.path,
            name: NOT_FOUND.en.name,
            component: () => import("@/pages/NotFoundPage.vue"),
            beforeEnter: []
        },
        {
            path: "/:catchAll(.*)",
            redirect: NOT_FOUND.en.path
        }
    ]
});

export default router;
