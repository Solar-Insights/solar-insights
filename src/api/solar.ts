import {
    BuildingInsightsError,
    BuildingInsightsQuotaError,
    GeotiffError,
    SolarLayersError
} from "@/helpers/alerts/errors";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, GeoTiff, SolarLayers } from "geo-env-typing/solar";
import AxiosInstance from "@/plugins/axios";

export async function getClosestBuildingInsights(coord: LatLng) {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/solar/closest-building-insights`,
        params: {
            lat: coord.lat,
            lng: coord.lng
        }
    })
        .then((response) => {
            return response.data.buildingInsights as BuildingInsights;
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                useUserSessionStore().setAlert(new BuildingInsightsQuotaError());
            } else {
                useUserSessionStore().setAlert(new BuildingInsightsError());
            }

            throw error;
        });
}

export async function getSolarLayers(coord: LatLng, radius: number) {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/solar/solar-layers`,
        params: {
            lat: coord.lat,
            lng: coord.lng,
            radius: radius
        }
    })
        .then((response) => {
            return response.data.solarLayers as SolarLayers;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new SolarLayersError());
            throw error;
        });
}

export async function getGeotiff(url: string) {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/solar/geotiff`,
        params: {
            url: encodeURIComponent(url)
        }
    })
        .then((response) => {
            return response.data.geotiff as GeoTiff;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new GeotiffError());
            throw error;
        });
}
