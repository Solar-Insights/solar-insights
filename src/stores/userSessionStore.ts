// Vue
import { defineStore } from "pinia";
import { Alert } from "@/helpers/types";
import { VueError } from "@/helpers/customErrors"; 


export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        displayAlert: false,
        alert: new VueError()
    }),

    actions: {
        resetUserStore() {
            this.displayAlert = false;
            this.alert = new VueError();
        },

        setAlert(alert: VueError) {
            this.displayAlert = true;
            this.alert = alert;
        },
    }
});