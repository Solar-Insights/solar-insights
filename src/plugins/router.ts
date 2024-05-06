import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { authGuard } from "@auth0/auth0-vue";

async function requiresOrgAdmin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (true) {
        // TODO Validate that user is admin of org
        next();
    }
    else 
        next({ name: "not-found" });
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/pages/Home.vue"),
            beforeEnter: [],
        },
        {
            path: "/search-location",
            name: "search",
            component: () => import("@/pages/Search.vue"),
            beforeEnter: [],
        },
        {
            path: "/solar-map",
            name: "solar-map",
            component: () => import("@/pages/SolarMap.vue"),
            beforeEnter: [authGuard],
        },
        {
            path: "/my-organization",
            name: "my-organization",
            component: () => import("@/pages/OrganizationAdmin.vue"),
            beforeEnter: [requiresOrgAdmin]
        },
        {
            path: "/not-found",
            name: "not-found",
            component: () => import("@/pages/CatchAll.vue"),
            beforeEnter: [],
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/not-found",
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const userSessionStore = useUserSessionStore();
    userSessionStore.resetAlertOnNewPage();

    next();
    return;
});

export default router;