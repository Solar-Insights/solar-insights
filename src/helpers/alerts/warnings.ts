import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class ReverseGeocodingWarning extends VueAlert {
    constructor(
        type: AlertType = "warning",
        title: string = i18n.global.t("alerts.warning.reverse-geocoding.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}