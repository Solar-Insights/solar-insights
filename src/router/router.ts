import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import { ROUTE_INFOS } from "./routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    routes: [
        {
            path: ROUTE_INFOS["home"].en.path,
            name: ROUTE_INFOS["home"].en.name,
            component: () => import("@/pages/HomePage.vue"),
            beforeEnter: []
        },
        {
            path: ROUTE_INFOS["search"].en.path,
            name: ROUTE_INFOS["search"].en.name,
            component: () => import("@/pages/SearchPage.vue"),
            beforeEnter: []
        },
        {
            path: ROUTE_INFOS["solar-map"].en.path,
            name: ROUTE_INFOS["solar-map"].en.name,
            component: () => import("@/pages/SolarMapPage.vue"),
            beforeEnter: [authGuard]
        },
        {
            path: ROUTE_INFOS["get-started"].en.path,
            name: ROUTE_INFOS["get-started"].en.name,
            component: () => import("@/pages/GetStartedPage.vue"),
            beforeEnter: []
        },
        {
            path: ROUTE_INFOS["my-organization"].en.path,
            name: ROUTE_INFOS["my-organization"].en.name,
            component: () => import("@/pages/MyOrganizationPage.vue"),
            beforeEnter: [authGuard]
        },
        {
            path: ROUTE_INFOS["pricing"].en.path,
            name: ROUTE_INFOS["pricing"].en.name,
            component: () => import("@/pages/PricingPage.vue"),
            beforeEnter: []
        },
        {
            path: ROUTE_INFOS["callback"].en.path,
            name: ROUTE_INFOS["callback"].en.name,
            component: () => import("@/pages/CallbackPage.vue"),
            beforeEnter: []
        },
        {
            path: ROUTE_INFOS["not-found"].en.path,
            name: ROUTE_INFOS["not-found"].en.name,
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
