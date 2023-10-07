import { coordinates, solarData, solarLayers } from "@/models/models";
import { fromArrayBuffer } from "geotiff";

export function getSolarData(coord: coordinates) {
    const requestUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${coord.lat}&location.longitude=${coord.lng}&key=${import.meta.env.VITE_GOOGLE_API}`;
    return fetch(requestUrl)
        .then((response) => {
            return response.json() as Promise<solarData>;
        })
};

export function getSolarLayers(coord: coordinates) {
    const requestUrl = `https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${coord.lat}&location.longitude=${coord.lng}&radiusMeters=20&view=FULL_LAYERS&requiredQuality=HIGH&pixelSizeMeters=1&key=${import.meta.env.VITE_GOOGLE_API}`;
    return fetch(requestUrl)
        .then((response) => {
            return response.json() as Promise<solarLayers>;
        })
};

export function getSingleSolarLayer(url: string) {
    const requestURL = `${url}&key=${import.meta.env.VITE_GOOGLE_API}`;
    console.log(requestURL);
    return fetch(requestURL)
        .then((response) => { 
            return response.body!;
        })
}

export function getSingleSolarLayerUrl(url: string) {
    return `${url}&key=${import.meta.env.VITE_GOOGLE_API}`;
}