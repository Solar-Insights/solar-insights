import axios from 'axios';
import { Coordinates } from 'solar-typing/src/general';

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function getAirQualityData(coord: Coordinates) {
    await axios({
        method: "get",
        responseType: 'json',
        url: `/air/air-quality-data`,
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