import { PollutantCode } from "geo-env-typing/air";

export type TimeParameters = {
    tick: number;
    month: number;
    day: number;
    hour: number;
};

export type Alert = {
    type: AlertType;
    title: string;
    message: string;
};

export type MapElements = {
    map: google.maps.Map;
    marker: google.maps.Marker;
    autocomplete: google.maps.places.Autocomplete;
};

export type AlertType = "warning" | "error" | "success";

export type Pollutants = {
    [K in PollutantCode]: {
        code: K;
        displayName: string;
        solution: string;
    };
};

export type UserSolarData = {
    minPanelCount: number;
    maxPanelCount: number;
    panelCapacityWatts: number;
    defaultPanelCapacityWatts: number;
    panelCount: number;
    installationCostPerWatt: number;
    yearlyEnergyDcKwh: number;
    dcToAcDerate: number;
    averageMonthlyEnergyBill: number;
    energyCostPerKwh: number;
    solarIncentives: number;
    yearlyPanelEfficiencyDecline: number;
    yearlyEnergyCostIncrease: number;
    yearlyDiscountRate: number;
    installationLifespan: number;
};

export type MapType = "AIR_QUALITY" | "SOLAR";

export type SolarReadonlyPanel = "BUILDING_READONLY" | "INSIGHTS_READONLY";
