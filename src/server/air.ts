import axios from 'axios';
import { AirQualityData } from 'solar-typing/src/airQuality';
import { Coordinates } from 'solar-typing/src/general';

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function getAirQualityData(coord: Coordinates) {
    return await axios({
        method: "get",
        responseType: 'json',
        url: `/air/air-quality-data`,
        params: {
            lat: coord.lat,
            lng: coord.lng
        }
      })
        .then((response) => {
            return response.data.airQualityData as AirQualityData;
        })
        .catch((error) => {
            console.log(error);
            return {} as AirQualityData;
        });
}