export type Coordinates = {
    lat: number,
    lng: number
};

export function validCoordinates(coord: Coordinates) {
    const { lat, lng } = coord;
    const respectLimits = lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    const notNull = lat != null && lng != null;
    const notNaN = !isNaN(lat) && !isNaN(lng);
    
    if ( !(respectLimits && notNull && notNaN) ) {
        console.log(`the coordinates (lat: ${coord.lat}, lng: ${coord.lng}) do not respect the template of coordinates`);
    }
    return respectLimits && notNull && notNaN;
};

/*
    Models for dataLayers response
*/
export type SolarLayers = {
    imageryDate: Date,
    imageryProcessedDate: Date,
    dsmUrl: string,
    rgbUrl: string,
    maskUrl: string,
    annualFluxUrl: string,
    monthlyFluxUrl: string,
    hourlyShadeUrls: string[],
    imageryQuality: string
};

/*
    Models for buildingInsight response
*/
export type BuildingInsights = {
    name: string,
    center: SolarDataCoords,
    imageryData: Date,
    regionCode: string,
    solarPotential: {
        maxArrayPanelsCount: number,
        maxArrayAreaMeters2: number,
        maxSunshineHoursPerYear: number,
        carbonOffsetFactorKgPerMwh: number,
        wholeRoofStats: {
            areaMeters2: number,
            sunshineQuantiles: number[],
            groundAreaMeters2: number
        },
        RoofSegmentStats: RoofSegment[]
        SolarPanelConfigs: SolarPanelConfig[],
        panelCapacityWatts: number,
        panelHeightMeters: number,
        panelWidthMeters: number,
        panelLifetimeYears: number,
        buildingStats: {
            areaMeters2: number,
            sunshineQuantiles: number[],
            groundAreaMeters2: number
        },
        SolarPanels: SolarPanel[]
    },
    BoundingBox: BoundingBox,
    imageryQuality: string,
    imageryProcessedDate: Date
};

export type SolarDataCoords = {
    latitude: number,
    longitude: number
};

type Date = {
    year: number,
    month: number,
    day: number
};

type BoundingBox = {
    sw: SolarDataCoords,
    ne: SolarDataCoords
};

type RoofSegment = {
    pitchDegrees: number,
    azimuthDegrees: number,
    stats: {
        areaMeters2: number,
        sunshineQuantiles: number[],
        groundAreaMeters2: number
    },
    center: SolarDataCoords,
    BoundingBox: BoundingBox
    planeHeightAtCenterMeters: number
};

type SolarPanelConfig = {
    panelsCount: number,
    yearlyEnergyDcKwh: number,
    RoofSegmentSummaries: RoofSegmentSummary[]
};

type RoofSegmentSummary = {
    pitchDegrees: number,
    azimuthDegrees: number,
    panelsCount: number,
    yearlyEnergyDcKwh: number,
    segmentIndex: number
};

type SolarPanel = {
    center: SolarDataCoords,
    orientation: string,
    yearlyEnergyDcKwh: number,
    segmentIndex: number
};

/*
    Model for Air Quality Data
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