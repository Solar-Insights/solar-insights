import { createI18n } from "vue-i18n";
import fr from "@/i18n/fr.json";
import en from "@/i18n/en.json";

const messages = {
    fr: fr,
    en: en
};

export const i18n = createI18n({
    sync: true,
    legacy: false,
    locale: "fr",
    fallbackLocale: "en",
    messages
});
