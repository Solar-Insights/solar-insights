// Vue
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
// Store
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
// Style
import vuetifyThemesAndComponents from "@/vuetify";
import "@/assets/_main.scss";
// i19n
import { createI18n } from "vue-i18n";
//import {} from "@/i18n/general";
//import {} from "@/i18n/solar";
//import {} from "@/i18n/air_quality";

const messages = {
    fr: { hello: "bonjour" },
    en: { hello: "hi" }
}
const i18n = createI18n({
    locale: "fr",
    fallbackLocale: "en",
    messages
});

const app = createApp(App);

app.use(i18n);
app.use(createPinia().use(piniaPluginPersistedState));
app.use(router);
app.use(vuetifyThemesAndComponents);
app.mount("#app");
