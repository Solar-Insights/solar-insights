import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class GeocodingError extends VueAlert {
    constructor(
        type: AlertType = "warning",
        name: string = "GeocodingError",
        title: string = i18n.global.t("alerts.error.geocoding.title"),
        message: string = i18n.global.t("alerts.error.geocoding.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class MapInitializationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "MapInitializationError",
        title: string = i18n.global.t("alerts.error.map-initialization.title"),
        message: string = i18n.global.t("alerts.error.map-initialization.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class UserInputError extends VueAlert {
    constructor(
        message: string,
        type: AlertType = "error",
        name: string = "UserInputError",
        title: string = i18n.global.t("alerts.error.user-input.title"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class AutocompleteInputError extends UserInputError {
    constructor(
        message: string = i18n.global.t("alerts.error.autocomplete-input.message"),
        type: AlertType = "error",
        name: string = "UserInputError",
        title: string = i18n.global.t("alerts.error.autocomplete-input.title"),
        code: number = 500
    ) {
        super(message, type, name, title, code);
    }
}

export class BuildingInsightsError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "BuildingInsightsError",
        title: string = i18n.global.t("alerts.error.building-insights.title"),
        message: string = i18n.global.t("alerts.error.building-insights.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class SolarLayersError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "SolarLayersError",
        title: string = i18n.global.t("alerts.error.solar-layers.title"),
        message: string = i18n.global.t("alerts.error.solar-layers.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class GeotiffError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "GeotiffError",
        title: string = i18n.global.t("alerts.error.geotiff.title"),
        message: string = i18n.global.t("alerts.error.geotiff.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class OrganizationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "OrganizationError",
        title: string = i18n.global.t("alerts.error.organization.title"),
        message: string = i18n.global.t("alerts.error.organization.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class UserError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "UserError",
        title: string = i18n.global.t("alerts.error.user.title"),
        message: string = i18n.global.t("alerts.error.user.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class FormError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "FormError",
        title: string = i18n.global.t("alerts.error.form.title"),
        message: string = i18n.global.t("alerts.error.form.message"),
        code: number = 400
    ) {
        super(type, name, title, message, code);
    }
}