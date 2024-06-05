import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/pages/HomePage.vue"),
            beforeEnter: []
        },
        {
            path: "/search-location",
            name: "search",
            component: () => import("@/pages/SearchPage.vue"),
            beforeEnter: []
        },
        {
            path: "/solar-map",
            name: "solar-map",
            component: () => import("@/pages/SolarMapPage.vue"),
            beforeEnter: [authGuard]
        },
        {
            path: "/get-started",
            name: "get-started",
            component: () => import("@/pages/GetStartedPage.vue"),
            beforeEnter: []
        },
        {
            path: "/my-organization",
            name: "my-organization",
            component: () => import("@/pages/MyOrganizationPage.vue"),
            beforeEnter: [authGuard]
        },
        {
            path: "/pricing",
            name: "pricing",
            component: () => import("@/pages/PricingPage.vue"),
            beforeEnter: []
        },
        {
            path: "/callback",
            name: "callback",
            component: () => import("@/pages/CallbackPage.vue"),
            beforeEnter: []
        },
        {
            path: "/not-found",
            name: "not-found",
            component: () => import("@/pages/CatchAllPage.vue"),
            beforeEnter: []
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/not-found"
        }
    ]
});

export default router;
