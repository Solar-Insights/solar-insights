import { PollutantCode } from "geo-env-typing/air";

export type TimeParameters = {
    tick: number;
    month: number;
    day: number;
    hour: number;
};

export type Alert = {
    type: AlertType;
    title: string;
    message: string;
};

export type MapElements = {
    map: google.maps.Map;
    marker: google.maps.Marker;
    autocomplete: google.maps.places.Autocomplete;
};

export type AlertType = "warning" | "error" | "success";

export type Pollutants = {
    [K in PollutantCode]: {
        code: K;
        displayName: string;
        solution: string;
    };
};
