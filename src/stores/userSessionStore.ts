import { defineStore } from "pinia";
import { VueError } from "@/helpers/customErrors";
import { Theme, Locale } from "@/helpers/types";

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        accessToken: "",
        alert: undefined as VueError | undefined,
        pendingApiRequest: 0,
        theme: "light" as Theme,
        locale: "en" as Locale
    }),

    actions: {
        setAlert(alert: VueError) {
            if (this.alert !== undefined) this.removeAlert();
            if (this.pendingApiRequest !== 0) this.alert = alert;
        },

        resetAlertOnNewPage() {
            this.alert = undefined;
            this.pendingApiRequest = 0;
        },

        removeAlert() {
            this.pendingApiRequest--;
            this.alert = undefined;
        },

        changeTheme() {
            this.theme = this.theme === "light" ? "dark" : "light";
        },

        changeLocale() {
            this.locale = this.locale === "fr" ? "en" : "fr";
        },

        hasAccessToken() {
            return this.accessToken !== "";
        }
    },

    persist: true
});
