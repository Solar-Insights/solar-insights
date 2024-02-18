// Vue
import { defineStore } from "pinia";
import { VueError } from "@/helpers/customErrors";

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        displayAlert: false,
        alert: new VueError()
    }),

    actions: {
        resetUserStore() {
            this.alert = new VueError();
            this.displayAlert = false;
        },

        setAlert(alert: VueError) {
            this.alert = alert;
            this.displayAlert = true;
        }
    }
});
