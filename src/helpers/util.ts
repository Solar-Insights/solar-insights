import { LatLng } from "geo-env-typing/geo";
import { MapElements, MapType } from "@/helpers/types";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { MapInitializationError } from "./customErrors";

/* String manipulation */
export function strToLargeNumberDisplay(input: string | number): String {
    let inputStr: string = input.toString().trim();

    // Handles decimal numbers
    let inputStrDecimal: string = "";
    let inputStrSplitted: string[] = inputStr.split(".");
    if (inputStrSplitted.length == 2) {
        inputStr = inputStrSplitted[0];
        inputStrDecimal = "." + inputStrSplitted[1];
    } else if (inputStrSplitted.length >= 2) {
        return inputStr;
    }

    // Handles negative numbers
    let inputStrNegative: string = "";
    if (inputStr.charAt(0) === "-") {
        inputStrNegative = "-";
        inputStr = inputStr.substring(1);
    }

    // Now handles the remaining numbers
    let inputStrTempo: string = "";
    for (let i = 0; i < inputStr.length; i++) {
        inputStrTempo +=
            (inputStr.length - 1 - i) % 3 == 0 && i != inputStr.length - 1
                ? `${inputStr.charAt(i)}\u00A0`
                : inputStr.charAt(i);
    }

    return inputStrNegative + inputStrTempo + inputStrDecimal;
}

/* Map components */
function zoom(mapType: MapType) {
    switch (mapType) {
        case "SOLAR":
            return 20;
        case "AIR_QUALITY":
            return 16;
        default:
            return 0;
    }
}

function minZoom(mapType: MapType) {
    switch (mapType) {
        case "SOLAR":
            return 18;
        case "AIR_QUALITY":
            return 14;
        default:
            return 0;
    }
}

function maxZoom(mapType: MapType) {
    switch (mapType) {
        case "SOLAR":
            return 22;
        case "AIR_QUALITY":
            return 16;
        default:
            return 0;
    }
}

export async function initMapComponents(coord: LatLng, mapType: MapType) {
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    let map: google.maps.Map = await initMap(coord, mapElement, mapType);
    let marker: google.maps.Marker | true = mapType === "SOLAR" ? true : initMarker(coord, map);

    if (map === undefined || marker === undefined) {
        useUserSessionStore().setAlert(new MapInitializationError());
    }

    return {
        map: map,
        marker: marker,
    } as MapElements;
}

export async function initMap(coord: LatLng, mapElement: HTMLElement, mapType: MapType): Promise<google.maps.Map> {
    const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
    return new Map(mapElement, {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        center: { lat: coord.lat, lng: coord.lng },
        zoom: zoom(mapType),
        minZoom: minZoom(mapType),
        maxZoom: maxZoom(mapType),
        tilt: 0,
        clickableIcons: false,
        disableDoubleClickZoom: true,
        isFractionalZoomEnabled: false,
        keyboardShortcuts: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        rotateControl: false,
        restriction: {
            latLngBounds: {
                north: 85.0,
                south: -60.0,
                west: -179.0,
                east: 179.0
            },
            strictBounds: true
        },
        styles: [
            {
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [{ visibility: "on" }, { color: "#55595C" }]
            },
            {
                featureType: "administrative",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#FFFFFF" }]
            }
        ]
    });
}

export function initMarker(coord: LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng }
    });
    marker.setMap(map);
    return marker;
}

export async function initAutocomplete(): Promise<google.maps.places.Autocomplete> {
    const autocompleteElementId = "autocomplete-search";
    const { Autocomplete } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
    
    const input = document.getElementById(autocompleteElementId) as HTMLInputElement;
    const options = {};

    const autocomplete = new Autocomplete(input, options);

    if (autocomplete === undefined) {
        useUserSessionStore().setAlert(new MapInitializationError());
    }

    return autocomplete;
}

export function prepareHandlerEnterKeyOnSearchBar() {
    handleEnterKeyOnSearchBar(document.getElementById("autocomplete-search") as HTMLInputElement);
}

function handleEnterKeyOnSearchBar(autocompleteSearch: HTMLInputElement) {
    autocompleteSearch.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "ArrowDown",
            keyCode: 40,
            code: "ArrowDown",
            bubbles: true,
            cancelable: true
        })
    );
    autocompleteSearch.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13,
            code: "Enter",
            bubbles: true,
            cancelable: true
        })
    );
}
