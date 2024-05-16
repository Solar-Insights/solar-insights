import type { ThemeDefinition } from "vuetify";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import { en, fr } from "vuetify/locale";

const customTheme: ThemeDefinition = {
    colors: {
        theme: "rgba(80, 164, 144, 1)",
        "theme-darker-1": "rgba(72, 147, 129, 1)",
        "theme-darker-2": "rgba(64, 131, 115, 1)",
        "theme-darker-3": "rgba(56, 114, 100, 1)",
        "theme-darker-4": "rgba(48, 98, 86, 1)",

        "theme-lighter-1": "rgba(97, 173, 155, 1)",
        "theme-lighter-2": "rgba(115, 182, 166, 1)",
        "theme-lighter-3": "rgba(132, 191, 177, 1)",
        "theme-lighter-4": "rgba(150, 200, 188, 1)",

        "dark-surface": "rgba(18, 18, 18, 1)",
        "dark-surface-lighter-1": "rgba(33, 33, 33, 1)",
        "dark-surface-lighter-2": "rgba(43, 43, 43, 1)",

        "light-surface": "rgba(255, 255, 255, 1)",
        "light-surface-darker-1": "rgba(221, 221, 221, 1)",

        scrollbars: "rgba(85, 85, 85, 1)",
        "light-grey": "rgba(148, 148, 148, 1)"
    }
};

const vuetifyThemesAndComponents = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "customTheme",
        themes: {
            customTheme
        }
    },
    icons: {
        defaultSet: "mdi",
        sets: {
            fa,
            mdi
        }
    },
    locale: {
        locale: "en",
        fallback: "en",
        messages: { en, fr }
    }
});
export default vuetifyThemesAndComponents;
