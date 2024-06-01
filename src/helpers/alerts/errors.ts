import { AlertType } from "@/helpers/types";
import { i18n } from "@/plugins/i18n/i18n";
import { VueAlert } from "@/helpers/alerts/default";

export class GeocodingError extends VueAlert {
    constructor(
        type: AlertType = "warning",
        name: string = "GeocodingError",
        title: string = i18n.global.t("errors.geocoding-error.title"),
        message: string = i18n.global.t("errors.geocoding-error.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class MapInitializationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "MapInitializationError",
        title: string = i18n.global.t("errors.map-initialization-error.title"),
        message: string = i18n.global.t("errors.map-initialization-error.message"),
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
        title: string = i18n.global.t("errors.user-input-error.title"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class AutocompleteInputError extends UserInputError {
    constructor(
        message: string = i18n.global.t("errors.autocomplete-input-error.message"),
        type: AlertType = "error",
        name: string = "UserInputError",
        title: string = i18n.global.t("errors.autocomplete-input-error.title"),
        code: number = 500
    ) {
        super(message, type, name, title, code);
    }
}

export class BuildingInsightsError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "BuildingInsightsError",
        title: string = i18n.global.t("errors.building-insights-error.title"),
        message: string = i18n.global.t("errors.building-insights-error.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class SolarLayersError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "SolarLayersError",
        title: string = i18n.global.t("errors.solar-layers-error.title"),
        message: string = i18n.global.t("errors.solar-layers-error.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class GeotiffError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "GeotiffError",
        title: string = i18n.global.t("errors.geotiff-error.title"),
        message: string = i18n.global.t("errors.geotiff-error.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class OrganizationError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "OrganizationError",
        title: string = i18n.global.t("errors.organization-error.title"),
        message: string = i18n.global.t("errors.organization-error.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class UserError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "UserError",
        title: string = i18n.global.t("errors.user-error.title"),
        message: string = i18n.global.t("errors.user-error.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class FormError extends VueAlert {
    constructor(
        type: AlertType = "error",
        name: string = "FormError",
        title: string = i18n.global.t("errors.form-error.title"),
        message: string = i18n.global.t("errors.form-error.message"),
        code: number = 400
    ) {
        super(type, name, title, message, code);
    }
}