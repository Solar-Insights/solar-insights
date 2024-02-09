import axios from 'axios';
import { Coordinates } from 'solar-typing/src/general';

axios.defaults.baseURL = import.meta.env.VITE_DEV_URL;

export async function getClosestBuildingInsights(coord: Coordinates, radius: number) {
    await axios({
        method: "get",
        responseType: 'json',
        url: `/solar/closest-building-insights`,
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

export async function getSolarLayers(coord: Coordinates, radius: number) {
    await axios({
        method: "get",
        responseType: 'json',
        url: `/solar/solar-layers`,
        params: {
            lat: coord.lat,
            lng: coord.lng,
            radius: radius
        }
      })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}