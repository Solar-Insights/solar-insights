// Models
import { UserSolarData } from "@/models/models";

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
    return yearlyEnergyAcProductionKwh(userSolarData) / yearlyEnergyConsumptionKwh(userSolarData);
}

export function circularBarColorSelector(value: string) {
    const num_value: number = Number(value);
    if ( isNaN(num_value)) return "green";
    else if ( num_value < 50 ) return "red";
    else if ( num_value < 80 ) return "orange";
    else return "green";
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