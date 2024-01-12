// Util
import { UserSolarData } from "@/util/solarTypes";

/*
    Units: None
*/
export function panelCapacityRatioCalc(userSolarData: UserSolarData) {
    return userSolarData.panelCapacityWatts / userSolarData.defaultPanelCapacityWatts;
}

/*
    Units: kWh
*/
export function yearlyEnergyCalc(userSolarData: UserSolarData) {
    return userSolarData.yearlyEnergyDcKwh * panelCapacityRatioCalc(userSolarData);
}

/*
    Units: kW
*/
export function installationSizeCalc(userSolarData: UserSolarData) {
    return userSolarData.panelCount * userSolarData.panelCapacityWatts / 1000;
}

/*
    Units: $
*/
export function installationCostCalc(userSolarData: UserSolarData) {
    return userSolarData.installationCostPerWatt * installationSizeCalc(userSolarData) * 1000;
}

/*
    Units: kWh
*/
export function yearlyEnergyAcProductionKwh(userSolarData: UserSolarData){
    return userSolarData.yearlyEnergyDcKwh * panelCapacityRatioCalc(userSolarData) * userSolarData.dcToAcDerate;
}

/*
    Units: kWh
*/
export function yearlyEnergyConsumptionKwh(userSolarData: UserSolarData) {
    return userSolarData.averageMonthlyEnergyBill / userSolarData.energyCostPerKwh * 12;
}

/*
    Units: %
*/
export function energyCoveredCalc(userSolarData: UserSolarData) {
    return yearlyEnergyAcProductionKwh(userSolarData) / yearlyEnergyConsumptionKwh(userSolarData) * 100;
}

/*
    To enhance interfaces
*/
export function circularBarColorSelector(value: string) {
    const numValue: number = Number(value);
    if ( isNaN(numValue)) return "green";
    else if ( numValue < 50 ) return "red";
    else if ( numValue < 80 ) return "orange";
    else return "green";
}

export function batteryCharging(value: number) {
    if (value > 90) return "mdi-battery-charging-100";
    else if (value > 80) return "mdi-battery-charging-90";
    else if (value > 70) return "mdi-battery-charging-80";
    else if (value > 60) return "mdi-battery-charging-70";
    else if (value > 50) return "mdi-battery-charging-60";
    else if (value > 40) return "mdi-battery-charging-50";
    else if (value > 30) return "mdi-battery-charging-40";
    else if (value > 20) return "mdi-battery-charging-30";
    else if (value > 10) return "mdi-battery-charging-20";
    else if (value > 0) return "mdi-battery-charging-10";
}

// For an updated list of pollutants, visit https://developers.google.com/maps/documentation/air-quality/pollutants
export const pollutants = {
    co: {
        code: "co",
        displayName: "CO"
    },
    c6h6 : {
        code: "c6h6",
        displayName: "C6H6"
    },
    ox : {
        code: "ox",
        displayName: "OX"
    },
    o3 : {
        code: "o3",
        displayName: "O3"
    },
    nh3 : {
        code: "nh3",
        displayName: "NH3"
    },
    nhmc : {
        code: "nhmc",
        displayName: "NHMC"
    },
    no : {
        code: "no",
        displayName: "NO"
    },
    nox : {
        code: "nox",
        displayName: "NOX"
    },
    no2 : {
        code: "no2",
        displayName: "NO2"
    },
    pm25 : {
        code: "pm25",
        displayName: "PM2.5"
    },
    pm10 : {
        code: "pm10",
        displayName: "PM10"
    },
    so2 : {
        code: "so2",
        displayName: "SO2"
    },
    trs : {
        code: "trs",
        displayName: "TRS"
    },
};

/*
    Solar colors
*/
export const binaryPalette = ['212121', 'B3E5FC'];

export const rainbowPalette = ['3949AB', '81D4FA', '66BB6A', 'FFE082', 'E53935'];

export const ironPalette = ['00000A', '91009C', 'E64616', 'FEB400', 'FFFFF6'];

export const sunlightPalette = ['212121', 'FFCA28'];

export const panelsPalette = ['E8EAF6', '1A237E'];