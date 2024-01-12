/**
 * Solar map types
 */

export type UserSolarData = {
    minPanelCount: number,
    maxPanelCount: number,
    panelCapacityWatts: number,
    defaultPanelCapacityWatts: number,
    panelCount: number,
    installationCostPerWatt: number,
    yearlyEnergyDcKwh: number,
    dcToAcDerate: number,
    averageMonthlyEnergyBill: number,
    energyCostPerKwh: number,
    solarIncentives: number
};

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
        roofSegmentStats: RoofSegment[]
        solarPanelConfigs: SolarPanelConfig[],
        panelCapacityWatts: number,
        panelHeightMeters: number,
        panelWidthMeters: number,
        panelLifetimeYears: number,
        buildingStats: {
            areaMeters2: number,
            sunshineQuantiles: number[],
            groundAreaMeters2: number
        },
        solarPanels: SolarPanel[]
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

export type SolarPanelConfig = {
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
