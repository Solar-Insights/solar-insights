// Vue
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createHead } from '@vueuse/head';
// Store
import { createPinia } from 'pinia';
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
// Style
import vuetifyThemesAndComponents from '@/vuetify/vuetify';
import './assets/main.scss';


// Create app and add required plugins
const app = createApp(App);
const head = createHead();

app.use(createPinia().use(piniaPluginPersistedState));
app.use(head);
app.use(router);
app.use(vuetifyThemesAndComponents);
app.mount('#app');
