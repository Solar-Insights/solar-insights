import axios from 'axios';
import { Coordinates } from 'solar-typing/src/general';

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function getGeocoding(formattedAddress: string) { 
    await axios({
        method: "get",
        responseType: 'json',
        url: `/util/geocoding`,
        params: {
            address: formattedAddress
        }
      })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function getReverseGeocoding(coord: Coordinates) {
    await axios({
        method: "get",
        responseType: 'json',
        url: `/util/reverse-geocoding`,
        params: {
            lat: coord.lat,
            lng: coord.lng
        }
      })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}