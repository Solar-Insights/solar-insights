import { LatLng } from "geo-env-typing/geo";
import { MapElements } from "@/helpers/types";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { MapInitializationError } from "@/helpers/alerts/errors";

const SOLAR_MIN_ZOOM = 18;
const SOLAR_ZOOM = 20;
const SOLAR_MAX_ZOOM = 22;

export async function initMapComponents(coord: LatLng) {
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    let map: google.maps.Map = await initMap(coord, mapElement);

    if (map === undefined) {
        useUserSessionStore().setAlert(new MapInitializationError());
    }

    return {
        map: map,
        marker: undefined as any,
        autocomplete: undefined as any
    } as MapElements;
}

export async function initMap(coord: LatLng, mapElement: HTMLElement): Promise<google.maps.Map> {
    const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
    return new Map(mapElement, {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        center: { lat: coord.lat, lng: coord.lng },
        zoom: SOLAR_ZOOM,
        minZoom: SOLAR_MIN_ZOOM,
        maxZoom: SOLAR_MAX_ZOOM,
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
