import { AlertType } from "@/helpers/types";
import { i18n } from "@/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class GeocodingError extends VueAlert {
    constructor(
        type: AlertType = "warning",
        title: string = i18n.global.t("alerts.error.geocoding.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class MapInitializationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.map-initialization.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class UserInputError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.user-input.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class AutocompleteInputError extends UserInputError {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.autocomplete-input.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class BuildingInsightsError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.building-insights.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class BuildingInsightsQuotaError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.building-insights-quota.title"),
        code: number = 422
    ) {
        super(type, title, code);
    }
}

export class SolarLayersError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.solar-layers.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class GeotiffError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.geotiff.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class OrganizationInfosError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.organization-infos.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class OrganizationUserCreationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.organization-user-creation.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class OrganizationUserCreationQuotaError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.organization-user-creation-quota.title"),
        code: number = 422
    ) {
        super(type, title, code);
    }
}

export class OrganizationUserDeletionError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.organization-user-deletion.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class UserError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.user.title"),
        code: number = 500
    ) {
        super(type, title, code);
    }
}

export class FormError extends VueAlert {
    constructor(
        type: AlertType = "error",
        title: string = i18n.global.t("alerts.error.form.title"),
        code: number = 400
    ) {
        super(type, title, code);
    }
}
