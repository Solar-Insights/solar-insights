import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class OrganizationSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        name: string = "OrganizationSuccess",
        title: string = i18n.global.t("success.organization-user-creation.title"),
        message: string = i18n.global.t("success.organization-user-creation.message"),
        code: number = 201
    ) {
        super(type, name, title, message, code);
    }
}