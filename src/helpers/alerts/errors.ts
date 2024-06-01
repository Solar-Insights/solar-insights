import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class GeocodingError extends VueAlert {
    constructor(
        type: AlertType = "warning",
        name: string = "GeocodingError",
        title: string = i18n.global.t("alerts.errors.geocoding.title"),
        message: string = i18n.global.t("alerts.errors.geocoding.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class MapInitializationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "MapInitializationError",
        title: string = i18n.global.t("alerts.errors.map-initialization.title"),
        message: string = i18n.global.t("alerts.errors.map-initialization.message"),
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
        title: string = i18n.global.t("alerts.errors.user-input.title"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class AutocompleteInputError extends UserInputError {
    constructor(
        message: string = i18n.global.t("alerts.errors.autocomplete-input.message"),
        type: AlertType = "error",
        name: string = "UserInputError",
        title: string = i18n.global.t("alerts.errors.autocomplete-input.title"),
        code: number = 500
    ) {
        super(message, type, name, title, code);
    }
}

export class BuildingInsightsError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "BuildingInsightsError",
        title: string = i18n.global.t("alerts.errors.building-insights.title"),
        message: string = i18n.global.t("alerts.errors.building-insights.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class SolarLayersError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "SolarLayersError",
        title: string = i18n.global.t("alerts.errors.solar-layers.title"),
        message: string = i18n.global.t("alerts.errors.solar-layers.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class GeotiffError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "GeotiffError",
        title: string = i18n.global.t("alerts.errors.geotiff.title"),
        message: string = i18n.global.t("alerts.errors.geotiff.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class OrganizationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "OrganizationError",
        title: string = i18n.global.t("alerts.errors.organization.title"),
        message: string = i18n.global.t("alerts.errors.organization.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class UserError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "UserError",
        title: string = i18n.global.t("alerts.errors.user.title"),
        message: string = i18n.global.t("alerts.errors.user.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class FormError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "FormError",
        title: string = i18n.global.t("alerts.errors.form.title"),
        message: string = i18n.global.t("alerts.errors.form.message"),
        code: number = 400
    ) {
        super(type, name, title, message, code);
    }
}