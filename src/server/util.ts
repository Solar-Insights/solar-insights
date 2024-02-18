import axios from "axios";
import { Coordinates } from "geo-env-typing/geo";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { GeocodingError, ReverseGeocodingError } from "@/helpers/customErrors";

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function getGeocoding(formattedAddress: string) {
    return await axios({
        method: "get",
        responseType: "json",
        url: `/util/geocoding`,
        params: {
            address: formattedAddress
        }
    })
        .then((response) => {
            return response.data.coordinates as Coordinates;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new GeocodingError());
            throw error;
        });
}

export async function getReverseGeocoding(coord: Coordinates) {
    return await axios({
        method: "get",
        responseType: "json",
        url: `/util/reverse-geocoding`,
        params: {
            lat: coord.lat,
            lng: coord.lng
        }
    })
        .then((response) => {
            return response.data.address as string;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new ReverseGeocodingError());
            throw error;
        });
}
