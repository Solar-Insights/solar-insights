// Vue
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    routes: [
        { path: "/", name: "home", component: () => import("@/pages/Home.vue") },
        { path: "/air-quality-map", name: "air-quality-map", component: () => import("@/pages/AirQualityMap.vue") },
        { path: "/solar-map", name: "solar-map", component: () => import("@/pages/SolarMap.vue") },

        { path: "/test", name: "test", component: () => import("@/pages/Test.vue") },

        { path: "/:catchAll(.*)", name: "catch-all", component: () => import("@/pages/CatchAll.vue") }
    ]
});

router.beforeEach(async (to, from, next) => {
    next();
    return;
});

export default router;
