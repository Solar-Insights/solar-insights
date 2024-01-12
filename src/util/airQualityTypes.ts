/**
 * Air quality map types
 */
export type AirQualityData = {
    DateTime: Date,
    healthRecommendations: HealthRecommendations,
    indexes: Aqi[],
    pollutants: AirPollutant[],
    regionCode: string
}; 

export type Aqi = {
    aqi: number,
    aqiDisplay: string,
    code: string,
    displayName: string,
    category: string,
    dominantPollutant: string,
    color: {
        // See example request on site. Seems like : { red: number, green: number, blue: number }.
        // These colours seem to depend on the AQI used
    },
};

export type AirPollutant = {
    code: string,
    displayName: string,
    fullName: string,
    additionalInfo: {
        effects: string,
        sources: string
    },
    concentration: {
        units: "PARTS_PER_BILLION" | "MICROGRAMS_PER_CUBIC_METER",
        value: number
    }
};

export type HealthRecommendations = {
    generalPopulation: string,
    children: string,
    elderly: string,
    athletes: string,
    pregnantWomen: string,
    heartDiseasePopulation: string,
    lungDiseasePopulation: string
};

export type MapType = "AIR_QUALITY" | "SOLAR";