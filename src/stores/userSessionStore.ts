// Vue
import { defineStore } from "pinia";
// Helpers
import { VueError } from "@/helpers/customErrors";
import { Theme } from "@/helpers/types";

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        displayAlert: false,
        alert: new VueError(),
        theme: "light" as Theme
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
            if (this.theme === "light") {
                this.theme = "dark";
            } else {
                this.theme = "light";
            }
        }
    },

    persist: true
});
