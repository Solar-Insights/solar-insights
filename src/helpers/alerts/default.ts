import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";

export class VueAlert {
    type: AlertType;
    title: string;
    code: number;

    constructor(
        type: AlertType = "warning",
        title: string = i18n.global.t("alerts.default.vue.title"),
        code: number = 500
    ) {
        this.type = type;
        this.title = title;
        this.code = code;
    }
}
