import { defineStore } from "pinia";
import { VueAlert } from "@/helpers/alerts/default";
import { Theme, Locale } from "@/helpers/types";
import { toast } from 'vuetify-sonner'
import { i18n } from "@/plugins/i18n/i18n";
import { getAlertDurationTime, matchIconToAlertType } from "@/helpers/alerts/components";

export const useUserSessionStore = defineStore("userSessionStore", {
    state: () => ({
        theme: "light" as Theme,
        locale: "en" as Locale,
        callbackPath: "" as string
    }),

    actions: {
        setAlert(alert: VueAlert) {
            const toastCardClass = this.theme === "dark" ? "dark-toast-content" : "light-toast-content";
            const toastTextClass = this.theme === "dark" ? "dark-toast-text" : "light-toast-text";
            const closeIconColor = this.theme === "dark" ? "white" : "black";
            const alertDuration = getAlertDurationTime(alert);

            toast(
                i18n.global.t(`alerts.${alert.type}.prepend`),
                {
                    description: alert.title,
                    progressBar: true,
                    progressDuration: alertDuration,
                    duration: alertDuration,
                    prependIcon: matchIconToAlertType(alert.type),
                    prependIconProps: {
                        size: "x-large",
                        class: "mr-4"
                    },
                    cardProps: {
                        variant: "outlined",
                        color: alert.type,
                        class: toastCardClass
                    },
                    cardTextProps: {
                        class: `font-weight-bold ${toastTextClass}`,
                    },
                    cardActionsProps: {
                        class: `pa-0`
                    },
                    action: {
                        buttonProps: {
                            icon: 'mdi-close',
                            color: closeIconColor
                        }
                    }
                }
            );
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
