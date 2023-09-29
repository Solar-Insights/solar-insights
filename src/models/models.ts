export type coordinates = {
    lat: number,
    lng: number
};

export function validCoordinates(coord: coordinates) {
    const { lat, lng } = coord;
    const respectLimits = lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    const notNull = lat != null && lng != null;
    const notNaN = isNaN(lat) || isNaN(lng);
    
    if ( !(respectLimits && notNull && notNaN) ) {
        console.log(`the coordinates (lat: ${coord.lat}, lng: ${coord.lng}) do not respect the template of coordinates`);
    }
    return respectLimits && notNull;
};



/*
    Models for solarAPI response
*/
export type solarData = {
    name: string,
    center: coordinates,
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

type date = {
    year: number,
    month: number,
    day: number
};

type boundingBox = {
    sw: coordinates,
    ne: coordinates
};

type roofSegment = {
    pitchDegrees: number,
    azimuthDegrees: number,
    stats: {
        areaMeters2: number,
        sunshineQuantiles: number[],
        groundAreaMeters2: number
    },
    center: coordinates,
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
    center: coordinates,
    orientation: string,
    yearlyEnergyDcKwh: number,
    segmentIndex: number
};