import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { i18n } from "@/i18n/i18n";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import vuetifyThemesAndComponents from "@/vuetify";
import "@/assets/_main.scss";

const app = createApp(App);

app.use(i18n);
app.use(createPinia().use(piniaPluginPersistedState));
app.use(router);
app.use(vuetifyThemesAndComponents);
app.mount("#app");
