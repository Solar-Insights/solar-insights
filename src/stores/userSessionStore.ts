import { defineStore } from "pinia";
import { VueError } from "@/helpers/customErrors";
import { Theme, Locale } from "@/helpers/types";
import { useLocale } from 'vuetify';

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        alert: undefined as VueError | undefined,
        pendingApiRequest: 0,
        theme: "light" as Theme,
        locale: "en" as Locale,
        callbackPath: "" as string
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

        setCallbackPath(path: string) {
            this.callbackPath = path;
        },

        getAndClearCallbackPath() {
            const callbackPath = this.callbackPath;
            this.callbackPath = "";
            return callbackPath;
        }
    },

    persist: true
});
