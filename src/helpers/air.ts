import { AirPollutant } from "geo-env-typing/air";

export function makeDominantPollutantFirst(dominantPollutant: string, listOfPollutants: AirPollutant[]) {
    const index = listOfPollutants.findIndex((pollutant) => pollutant.code === dominantPollutant);
    if (index != -1) {
        const tempoPollutant = listOfPollutants[index];
        listOfPollutants.splice(index, 1);
        listOfPollutants.unshift(tempoPollutant);
    }
}
