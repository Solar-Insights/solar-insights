import { createRouter, createWebHistory } from "vue-router";
import { useUserSessionStore } from "@/stores/userSessionStore";

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
            meta: { requiresAuth: false }
        },
        { 
            path: "/solar-map", 
            name: "solar-map", 
            component: () => import("@/pages/SolarMap.vue"),
            meta: { requiresAuth: false }
        },
        { 
            path: "/:catchAll(.*)", 
            name: "catch-all", 
            component: () => import("@/pages/CatchAll.vue"),
            meta: { requiresAuth: false }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const meta = to.meta;
    const userSessionStore = useUserSessionStore();
    userSessionStore.resetAlertOnNewPage();

    if (meta.requiresAuth && !userSessionStore.isLoggedIn) {
        next({ name: "home" });
        return;
    }

    next();
    return;
});

export default router;
