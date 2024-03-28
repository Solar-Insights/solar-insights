import { AirQualityData } from "geo-env-typing/air";
import { LatLng } from "geo-env-typing/geo";
import { makeDominantPollutantFirst } from "@/helpers/air";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { AirQualityDataError } from "@/helpers/customErrors";
import AxiosInstance from "@/api/axiosInit";

export async function getAirQualityData(coord: LatLng) {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/air/air-quality-data`,
        params: {
            lat: coord.lat,
            lng: coord.lng
        }
    })
        .then((response) => {
            const airQualityData: AirQualityData = response.data.airQualityData;
            makeDominantPollutantFirst(airQualityData.indexes[0].dominantPollutant, airQualityData.pollutants);
            return response.data.airQualityData as AirQualityData;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new AirQualityDataError());
            throw error;
        });
}
