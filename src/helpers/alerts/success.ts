import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class OrganizationUserCreationSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        name: string = "OrganizationUserCreationSuccess",
        title: string = i18n.global.t("alerts.success.organization-user-creation.title"),
        message: string = i18n.global.t("alerts.success.organization-user-creation.message"),
        code: number = 201
    ) {
        super(type, name, title, message, code);
    }
}

export class OrganizationUserDeletionSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        name: string = "OrganizationUserDeletionSuccess",
        title: string = i18n.global.t("alerts.success.organization-user-deletion.title"),
        message: string = i18n.global.t("alerts.success.organization-user-deletion.message"),
        code: number = 201
    ) {
        super(type, name, title, message, code);
    }
}

export class CreateOrganizationFormSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        name: string = "CreateOrganizationFormSuccess",
        title: string = i18n.global.t("alerts.success.create-organization-form.title"),
        message: string = i18n.global.t("alerts.success.create-organization-form.message"),
        code: number = 201
    ) {
        super(type, name, title, message, code);
    }
}
