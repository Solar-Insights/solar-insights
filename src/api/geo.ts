import { LatLng } from "geo-env-typing/geo";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { GeocodingError } from "@/helpers/alerts/errors";
import { ReverseGeocodingWarning } from "@/helpers/alerts/warnings";
import AxiosInstance from "@/plugins/axios";

export async function getGeocoding(formattedAddress: string) {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/geo/geocoding`,
        params: {
            address: formattedAddress
        }
    })
        .then((response) => {
            return response.data.coordinates as LatLng;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new GeocodingError());
            throw error;
        });
}

export async function getReverseGeocoding(coord: LatLng) {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/geo/reverse-geocoding`,
        params: {
            lat: coord.lat,
            lng: coord.lng
        }
    })
        .then((response) => {
            return response.data.address as string;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new ReverseGeocodingWarning());
            throw error;
        });
}
