import axios from "axios";
import { Coordinates } from "solar-typing/src/general";
import { BuildingInsights, GeoTiff, SolarLayers } from "solar-typing/src/solar";

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function getClosestBuildingInsights(coord: Coordinates) {
    return await axios({
        method: "get",
        responseType: "json",
        url: `/solar/closest-building-insights`,
        params: {
            lat: coord.lat,
            lng: coord.lng,
        },
    })
        .then((response) => {
            return response.data.buildingInsights as BuildingInsights;
        })
        .catch((error) => {
            console.log(error);
            return {} as BuildingInsights;
        });
}

export async function getSolarLayers(coord: Coordinates, radius: number) {
    return await axios({
        method: "get",
        responseType: "json",
        url: `/solar/solar-layers`,
        params: {
            lat: coord.lat,
            lng: coord.lng,
            radius: radius,
        },
    })
        .then((response) => {
            return response.data.solarLayers as SolarLayers;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export async function getGeotiff(url: string) {
    return await axios({
        method: "get",
        responseType: "json",
        url: `/solar/geotiff`,
        params: {
            url: encodeURIComponent(url),
        },
    })
        .then((response) => {
            return response.data.geotiff as GeoTiff;
        })
        .catch((error) => {
            console.log(error);
            return {} as GeoTiff;
        });
}
