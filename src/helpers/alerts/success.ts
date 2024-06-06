import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class UserLoginSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        title: string = i18n.global.t("alerts.success.user-login.title"),
        code: number = 200
    ) {
        super(type, title, code);
    } 
}

export class UserLogoutSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        title: string = i18n.global.t("alerts.success.user-logout.title"),
        code: number = 200
    ) {
        super(type, title, code);
    } 
}

export class OrganizationUserCreationSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        title: string = i18n.global.t("alerts.success.organization-user-creation.title"),
        code: number = 201
    ) {
        super(type, title, code);
    }
}

export class OrganizationUserDeletionSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        title: string = i18n.global.t("alerts.success.organization-user-deletion.title"),
        code: number = 200
    ) {
        super(type, title, code);
    }
}

export class CreateOrganizationFormSuccess extends VueAlert {
    constructor(
        type: AlertType = "success",
        title: string = i18n.global.t("alerts.success.create-organization-form.title"),
        code: number = 201
    ) {
        super(type, title, code);
    }
}
