import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class ReverseGeocodingWarning extends VueAlert {
    constructor(
        type: AlertType = "warning",
        name: string = "ReverseGeocodingWarning",
        title: string = i18n.global.t("alerts.warning.reverse-geocoding.title"),
        message: string = i18n.global.t("alerts.warning.reverse-geocoding.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}