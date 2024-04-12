import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { i18n } from "@/i18n/i18n";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import vuetifyThemesAndComponents from "@/vuetify";
import "@/assets/_main.scss";
import { createAuth0 } from "@auth0/auth0-vue";

const app = createApp(App);

app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            redirect_uri: window.location.origin // will choose http://localhost:5173 or https://solarinsights.ca
        }
    })
);
app.use(i18n);
app.use(createPinia().use(piniaPluginPersistedState));
app.use(router);
app.use(vuetifyThemesAndComponents);
app.mount("#app");
