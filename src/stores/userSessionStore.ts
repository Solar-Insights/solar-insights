// Vue
import { defineStore } from "pinia";
// Helpers
import { VueError } from "@/helpers/customErrors";
import { Theme, Locale } from "@/helpers/types";

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        displayAlert: false,
        alert: new VueError(),
        theme: "light" as Theme,
        locale: "en" as Locale
    }),

    actions: {
        resetUserStore() {
            this.alert = new VueError();
            this.displayAlert = false;
        },

        setAlert(alert: VueError) {
            this.alert = alert;
            this.displayAlert = true;
        },

        changeTheme() {
            this.theme = this.theme === "light" ? "dark" : "light";
        },

        changeLocale() {
            this.locale = this.locale === "fr" ? "en" : "fr";
        }
    },

    persist: true
});
