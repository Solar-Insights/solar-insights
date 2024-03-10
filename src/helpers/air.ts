import { AirPollutant } from "geo-env-typing/air";

export function makeDominantPollutantFirst(dominantPollutant: string, listOfPollutants: AirPollutant[]) {
    const index = listOfPollutants.findIndex((pollutant) => pollutant.code === dominantPollutant);
    if (index != -1) {
        const tempoPollutant = listOfPollutants[index];
        listOfPollutants.splice(index, 1);
        listOfPollutants.unshift(tempoPollutant);
    }
}

export const healthRecommendationsList = [
    {
        index: 0,
        group: "generalPopulation",
        displayName: "General population",
        recommendation: "",
        icon: "mdi-account-group"
    },
    {
        index: 1,
        group: "children",
        displayName: "Children",
        recommendation: "",
        icon: "mdi-baby-carriage"
    },
    {
        index: 2,
        group: "elderly",
        displayName: "Senior citizens",
        recommendation: "",
        icon: "mdi-human-cane"
    },
    {
        index: 3,
        group: "athletes",
        displayName: "Athletes",
        recommendation: "",
        icon: "mdi-weight-lifter"
    },
    {
        index: 4,
        group: "pregnantWomen",
        displayName: "Pregnant women",
        recommendation: "",
        icon: "mdi-human-pregnant"
    },
    {
        index: 5,
        group: "heartDiseasePopulation",
        displayName: "Individuals with heart-related issues",
        recommendation: "",
        icon: "mdi-heart"
    },
    {
        index: 6,
        group: "lungDiseasePopulation",
        displayName: "Individuals with lung-related issues",
        recommendation: "",
        icon: "mdi-lungs"
    }
];
