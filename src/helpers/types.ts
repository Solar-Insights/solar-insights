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

export type UserSolarData = {
    panelCount: number;
    minPanelCount: number;
    maxPanelCount: number;
    panelCapacityWatts: number;
    defaultPanelCapacityWatts: number;
    installationLifespan: number;
    installationCostPerWatt: number;
    yearlyEnergyDcKwh: number;
    dcToAcDerate: number;
    averageMonthlyEnergyBill: number;
    energyCostPerKwh: number;
    solarIncentives: number;
    yearlyPanelEfficiencyDecline: number;
    yearlyEnergyCostIncrease: number;
    yearlyDiscountRate: number;
};

export type SolarReadonlyPanel = "BUILDING_READONLY" | "INSIGHTS_READONLY";

export type TimeSerie = {
    name: String;
    data: TimeSerieData;
};

export type TimeSerieData = [Date, number][];

export type Theme = "light" | "dark";

export type Locale = "fr" | "en";

export type ExportType = "json";

export type InstallationExportOptions = {
    solarInsightsAndParameters: boolean;
    panelConfiguration: boolean;
    exportType: ExportType;
};

export function getDefaultInstallationExportOptions() {
    return {
        solarInsightsAndParameters: true,
        buildingAttributes: true,
        panelConfiguration: true,
        exportType: "json"
    } as InstallationExportOptions;
}

export type RouteInfo = {
    name: string;
    icon: string;
    requiresAuth: boolean;
};

export type MyOrganization = {};

export type UserData = {
    created_date: string;
    email: string;
    name: string;
    avatar: string;
};
