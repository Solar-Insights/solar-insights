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

export interface RequestError {
	error: {
		code: number;
		message: string;
		status: string;
	};
}

/*
    Models for buildingInsight response
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
    imageryQuality: 'HIGH' | 'MEDIUM' | 'LOW';
};

export type LayerId = 'mask' | 'dsm' | 'rgb' | 'annualFlux' | 'monthlyFlux' | 'hourlyShade';

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
    boundingBox: BoundingBox,
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

export type Layer = {
	id: LayerId;
	render: (showRoofOnly: boolean, month: number, day: number) => HTMLCanvasElement[];
	bounds: Bounds;
	palette?: Palette;
}

export type Palette = {
	colors: string[];
	min: string;
	max: string;
}

export type Bounds = {
	north: number;
	south: number;
	east: number;
	west: number;
}

export type GeoTiff = {
	width: number;
	height: number;
	rasters: Array<number>[];
	bounds: Bounds;
}

export const binaryPalette = ['212121', 'B3E5FC'];

export const rainbowPalette = ['3949AB', '81D4FA', '66BB6A', 'FFE082', 'E53935'];

export const ironPalette = ['00000A', '91009C', 'E64616', 'FEB400', 'FFFFF6'];

export const sunlightPalette = ['212121', 'FFCA28'];

export const panelsPalette = ['E8EAF6', '1A237E'];




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