export type coordinates = {
    lat: number,
    lng: number
};

export function validCoordinates(coord: coordinates) {
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
export type solarLayers = {
    imageryDate: date,
    imageryProcessedDate: date,
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
export type solarData = {
    name: string,
    center: solarDataCoords,
    imageryData: date,
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
        roofSegmentStats: roofSegment[]
        solarPanelConfigs: solarPanelConfig[],
        panelCapacityWatts: number,
        panelHeightMeters: number,
        panelWidthMeters: number,
        panelLifetimeYears: number,
        buildingStats: {
            areaMeters2: number,
            sunshineQuantiles: number[],
            groundAreaMeters2: number
        },
        solarPanels: solarPanel[]
    },
    boundingBox: boundingBox,
    imageryQuality: string,
    imageryProcessedDate: date
};

export type solarDataCoords = {
    latitude: number,
    longitude: number
};

type date = {
    year: number,
    month: number,
    day: number
};

type boundingBox = {
    sw: solarDataCoords,
    ne: solarDataCoords
};

type roofSegment = {
    pitchDegrees: number,
    azimuthDegrees: number,
    stats: {
        areaMeters2: number,
        sunshineQuantiles: number[],
        groundAreaMeters2: number
    },
    center: solarDataCoords,
    boundingBox: boundingBox
    planeHeightAtCenterMeters: number
};

type solarPanelConfig = {
    panelsCount: number,
    yearlyEnergyDcKwh: number,
    roofSegmentSummaries: roofSegmentSummary[]
};

type roofSegmentSummary = {
    pitchDegrees: number,
    azimuthDegrees: number,
    panelsCount: number,
    yearlyEnergyDcKwh: number,
    segmentIndex: number
};

type solarPanel = {
    center: solarDataCoords,
    orientation: string,
    yearlyEnergyDcKwh: number,
    segmentIndex: number
};

/*
    Model for Air Quality Data
*/
export type airQualityData = {
    dateTime: Date,
    healthRecommendations: {
        generalPopulation: string,
        children: string,
        elderly: string,
        athletes: string,
        pregnantWomen: string,
        heartDiseasePopulation: string,
        lungDiseasePopulation: string
    },
    indexes: aqi[],
    pollutants: airPollutant[],
    regionCode: string
};

export type airPollutant = {
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

export type aqi = {
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