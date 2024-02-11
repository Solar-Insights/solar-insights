import { AlertType } from "./types";

export class VueError extends Error {
    type: AlertType;
    name: string;
    title: string;
    message: string;
    code: number;

    constructor(
        type: AlertType = "warning", 
        name: string = "Error",
        title: string = "Something happened",
        message: string = "An error was encountered during the execution of the program.",
        code: number = 500
    ){
        super();
        this.type = type;
        this.name = name;
        this.title = title;
        this.message = message;
        this.code = code;
    }
};

export class GeocodingError extends VueError {
    constructor(
        type: AlertType = "warning",
        name: string = "GeocodingError",
        title: string = "The server could not geocode the given address",
        message: string = "An error occured when trying to convert the address to geographic goordinates.",
        code: number = 500
    ){
        super(type, name, title, message, code);
    }
};

export class ReverseGeocodingError extends VueError {
    constructor(
        type: AlertType = "warning", 
        name: string = "ReverseGeocodingError",
        title: string = "The server could not reverse geocode the given geographic coordinates",
        message: string = "An error occured when trying to convert geographic coordinates to an address.",
        code: number = 500
    ){
        super(type, name, title, message, code);
    }
};

export class MapInitializationError extends VueError {
    constructor(
        type: AlertType = "error", 
        name: string = "MapInitializationError",
        title: string = "The server could not properly load the map",
        message: string = "An error occured when trying to load the map and its components.",
        code: number = 500
    ){
        super(type, name, title, message, code);
    }
};

export class UserInputError extends VueError {
    constructor(
        message: string,
        type: AlertType = "error", 
        name: string = "UserInputError",
        title: string = "The provided user input provoked an error",
        code: number = 500,
    ){
        super(type, name, title, message, code);
    }
};

export class AutocompleteInputError extends UserInputError {
    constructor(
        message: string = "Select a valid address from the dropdown menu.",
        type: AlertType = "error", 
        name: string = "UserInputError",
        title: string = "The provided user input provoked an error",
        code: number = 500,
    ){
        super(message, type, name, title, code);
    }
}

