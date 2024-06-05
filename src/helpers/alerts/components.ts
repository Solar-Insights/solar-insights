import { AlertType } from "@/helpers/types";

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
