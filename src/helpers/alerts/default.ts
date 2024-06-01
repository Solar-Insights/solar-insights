import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";

export class VueAlert {
    type: AlertType;
    name: string;
    title: string;
    message: string;
    code: number;

    constructor(
        type: AlertType = "warning",
        name: string = "Error",
        title: string = i18n.global.t("alerts.default.vue.title"),
        message: string = i18n.global.t("alerts.default.vue.message"),
        code: number = 500
    ) {
        this.type = type;
        this.name = name;
        this.title = title;
        this.message = message;
        this.code = code;
    }
}
