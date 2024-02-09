import axios from "axios";
import { Coordinates } from "solar-typing/src/general";

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function getGeocoding(formattedAddress: string) {
    return await axios({
        method: "get",
        responseType: "json",
        url: `/util/geocoding`,
        params: {
            address: formattedAddress,
        },
    })
        .then((response) => {
            return response.data.coordinates as Coordinates;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export async function getReverseGeocoding(coord: Coordinates) {
    return await axios({
        method: "get",
        responseType: "json",
        url: `/util/reverse-geocoding`,
        params: {
            lat: coord.lat,
            lng: coord.lng,
        },
    })
        .then((response) => {
            return response.data.formattedAddress as string;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}
