// Vue
import { defineStore } from "pinia";
import { Alert } from "@/helpers/types";


export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        displayAlert: false,
        alert: {
            type: "",
            title: "",
            message: ""
        } as Alert
    }),

    actions: {
        resetUserStore() {
            this.alert = {
                type: "",
                title: "",
                message: ""
            } as Alert;
        },

        setAlert(alert: Alert) {
            this.displayAlert = false; // To make sure alert timer resets & old alert is removed 
            this.displayAlert = true;

            this.alert.message = alert.message;
            this.alert.title = alert.title;
            this.alert.type = alert.type;
        }
    },

    persist: true,
});