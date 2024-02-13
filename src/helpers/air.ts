import { getAirQualityData } from "@/server/air";
import { AirPollutant, AirQualityData } from "solar-typing/src/airQuality";
import { Coordinates } from "solar-typing/src/general";
import { initMarker } from "@/helpers/util";

export function makeDominantPollutantFirst(dominantPollutant: string, listOfPollutants: AirPollutant[]) {
    const index = listOfPollutants.findIndex((pollutant) => pollutant.code == dominantPollutant);
    if (index != -1) {
        listOfPollutants.sort((a, b) => {
            if (a.code == dominantPollutant) return -1;
            if (b.code == dominantPollutant) return -1;
            return a.code.localeCompare(b.code);
        });
    }
}