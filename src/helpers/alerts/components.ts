import { AlertType } from "@/helpers/types";
import { VueAlert } from "@/helpers/alerts/default";

const REGULAR_ALERT_DURATION_TIME = 4000;
const QUOTA_ERROR_CODE = 422;

export function getAlertDurationTime(alert: VueAlert) {
    if (alert.code === QUOTA_ERROR_CODE) return Infinity;
    else return REGULAR_ALERT_DURATION_TIME;
}

export function matchIconToAlertType(alertType: AlertType) {
    switch (alertType) {
        case "success":
            return "mdi-checkbox-marked-circle-outline";
        case "warning":
            return "mdi-alert-circle-outline";
        case "error":
            return "mdi-close-circle-outline";
    }
}
