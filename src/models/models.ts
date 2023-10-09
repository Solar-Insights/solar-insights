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
    Model for Air Layer Response
*/

export type airLayerData = {
    type: string,
    url: string,
    statusText: string,
    status: number,
    redirected: boolean,
    ok: boolean,
    bodyUsed: boolean,
    body: ReadableStream,
    headers: Headers
};
