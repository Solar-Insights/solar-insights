import { AlertType } from "./types";
import { i18n } from "@/i18n/i18n";

export function matchType(type: AlertType) {
    switch (type) {
        case "success": {
            return "success";
        }
        case "warning": {
            return "warning";
        }
        case "error": {
            return "error";
        }
        default: {
            return "warning";
        }
    }
}

export function matchTitle(title: string) {
    switch (title) {
        case "": {
            return "Error encountered";
        }
        default: {
            return title;
        }
    }
}

export function matchMessage(message: string) {
    switch (message) {
        case "": {
            return "Something has happened";
        }
        default: {
            return message;
        }
    }
}

export function matchColorToType(type: AlertType) {
    // https://vuetifyjs.com/en/styles/colors/#material-colors
    switch (type) {
        case "success": {
            return "#A5D6A7";
        }
        case "warning": {
            return "#FFCC80";
        }
        case "error": {
            return "#EF9A9A";
        }
        default: {
            return "#FFCC80";
        }
    }
}

export class VueError extends Error {
    type: AlertType;
    name: string;
    title: string;
    message: string;
    code: number;

    constructor(
        type: AlertType = "warning",
        name: string = "Error",
        title: string = i18n.global.t("errors.vue-error.title"),
        message: string = i18n.global.t("errors.vue-error.message"),
        code: number = 500
    ) {
        super();
        this.type = type;
        this.name = name;
        this.title = title;
        this.message = message;
        this.code = code;
    }
}

export class MapInitializationError extends VueError {
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

export class UserInputError extends VueError {
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

export class GeocodingError extends VueError {
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

export class ReverseGeocodingError extends VueError {
    constructor(
        type: AlertType = "warning",
        name: string = "ReverseGeocodingError",
        title: string = i18n.global.t("errors.reverse-geocoding-error.title"),
        message: string = i18n.global.t("errors.reverse-geocoding-error.message"),
        code: number = 500
    ) {
        super(type, name, title, message, code);
    }
}

export class BuildingInsightsError extends VueError {
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

export class SolarLayersError extends VueError {
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

export class GeotiffError extends VueError {
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
