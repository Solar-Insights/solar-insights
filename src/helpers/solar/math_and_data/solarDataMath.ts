import { FinancialParameters, PanelParameters, UserSolarData } from "@/helpers/types";
import { DefaultFinancialParameters, DefaultUserSolarData } from "@/helpers/solar/math_and_data/defaultData";

export namespace SolarMathVariables {
    export const CANADA_2015_TOTAL_RESIDENTIAL_AREA_METERS2 = 2026000000; // https://www.climate-chance.org/wp-content/uploads/2019/03/en_fp13-canada-residentiel_def-1.pdf
    export const CANADA_2015_TOTAL_RESIDENTIAL_KWH_CONSUMPTION = 164617880556; // https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=2510006001
}

export function lerp(x: number, y: number, t: number) {
    return x + t * (y - x);
}

export function normalize(x: number, max: number = 1, min: number = 0) {
    const y = (x - min) / (max - min);
    return clamp(y, 0, 1);
}

export function clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max);
}

/*
    Units: None
*/
export function panelCapacityRatioCalc(panelParameters: PanelParameters) {
    return panelParameters.panelCapacityWatts / panelParameters.defaultPanelCapacityWatts;
}

/*
    Units: None
*/
export function yearlyDiscountRate(financialParameters: FinancialParameters) {
    return 1 + financialParameters.yearlyDiscountRate / 100;
}

/*
    Units: None
*/
export function yearlyPanelEfficiencyDecline(panelParameters: PanelParameters) {
    return 1 - panelParameters.yearlyPanelEfficiencyDecline / 100;
}

/*
    Units: None
*/
export function yearlyEnergyCostIncrease(financialParameters: FinancialParameters) {
    return 1 + financialParameters.yearlyEnergyCostIncrease / 100;
}

/*
    Units: None
*/
export function dcToAcDerate(panelParameters: PanelParameters) {
    return panelParameters.dcToAcDerate / 100;
}

/*
    Units: kWh
*/
export function yearlyEnergyCalc(userSolarData: UserSolarData, panelParameters: PanelParameters) {
    return userSolarData.yearlyEnergyDcKwh * panelCapacityRatioCalc(panelParameters);
}

/*
    Units: kW
*/
export function installationSizeCalc(userSolarData: UserSolarData, panelParameters: PanelParameters) {
    return (userSolarData.panelCount * panelParameters.panelCapacityWatts) / 1000;
}

/*
    Units: $
*/
export function installationCostCalc(userSolarData: UserSolarData, financialParameters: FinancialParameters, panelParameters: PanelParameters) {
    return financialParameters.installationCostPerWatt * installationSizeCalc(userSolarData, panelParameters) * 1000;
}

/*
    Units: []kWh
    Division by 100 because dcToAcDerate in percent
*/
export function yearlyEnergyAcProductionKwh(userSolarData: UserSolarData, financialParameters: FinancialParameters, panelParameters: PanelParameters) {
    const energyProduction: number[] = [];
    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        energyProduction.push(
            userSolarData.yearlyEnergyDcKwh *
                panelCapacityRatioCalc(panelParameters) *
                dcToAcDerate(panelParameters) *
                yearlyPanelEfficiencyDecline(panelParameters) ** i
        );
    }

    return energyProduction;
}

/*
    Units: kWh
*/
export function yearlyEnergyConsumptionKwh(financialParameters: FinancialParameters) {
    return (financialParameters.averageMonthlyEnergyBill / financialParameters.energyCostPerKwh) * 12;
}

/*
    Units: %
*/
export function energyCoveredCalc(userSolarData: UserSolarData, financialParameters: FinancialParameters, panelParameters: PanelParameters) {
    return (yearlyEnergyAcProductionKwh(userSolarData, financialParameters, panelParameters)[0] / yearlyEnergyConsumptionKwh(financialParameters)) * 100;
}

/*
    Units: $
*/
export function yearlyUtilityBillEstimates(userSolarData: UserSolarData, financialParameters: FinancialParameters, panelParameters: PanelParameters) {
    const utilityBillEstimates: number[] = [];
    const energyProduction: number[] = yearlyEnergyAcProductionKwh(userSolarData, financialParameters, panelParameters);
    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        utilityBillEstimates.push(
            Math.max(
                ((yearlyEnergyConsumptionKwh(financialParameters) - energyProduction[i]) *
                    financialParameters.energyCostPerKwh *
                    yearlyEnergyCostIncrease(financialParameters) ** i) /
                    yearlyDiscountRate(financialParameters) ** i,
                0
            )
        );
    }

    return utilityBillEstimates;
}

/*
    Units: $
*/
export function costWithSolarInstallation(userSolarData: UserSolarData, financialParameters: FinancialParameters, panelParameters: PanelParameters) {
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(userSolarData, financialParameters, panelParameters);
    return (
        installationCostCalc(userSolarData, financialParameters, panelParameters) +
        utilityBillEstimates.reduce((x, y) => x + y, 0) -
        financialParameters.solarIncentives
    );
}

/**
    Units: $
 */
export function monthlyEnergyBillApproximation(areaMeters2: number) {
    const canadianResidentialKwhToMeter2Ratio =
        SolarMathVariables.CANADA_2015_TOTAL_RESIDENTIAL_KWH_CONSUMPTION /
        SolarMathVariables.CANADA_2015_TOTAL_RESIDENTIAL_AREA_METERS2;
    const residentialKwhEstimate = areaMeters2 * canadianResidentialKwhToMeter2Ratio;
    const yearlyEnergyCostEstimate = residentialKwhEstimate * DefaultFinancialParameters.ENERGY_COST_PER_KWH;
    return Math.round(yearlyEnergyCostEstimate / 12);
}
