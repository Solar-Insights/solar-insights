import { UserSolarData } from "@/helpers/types";

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
export function panelCapacityRatioCalc(userSolarData: UserSolarData) {
    return userSolarData.panelCapacityWatts / userSolarData.defaultPanelCapacityWatts;
}

/*
    Units: None
*/
export function yearlyDiscountRate(userSolarData: UserSolarData) {
    return 1 + userSolarData.yearlyDiscountRate / 100;
}

/*
    Units: None
*/
export function yearlyPanelEfficiencyDecline(userSolarData: UserSolarData) {
    return 1 - userSolarData.yearlyPanelEfficiencyDecline / 100;
}

/*
    Units: None
*/
export function yearlyEnergyCostIncrease(userSolarData: UserSolarData) {
    return 1 + userSolarData.yearlyEnergyCostIncrease / 100;
}

/*
    Units: None
*/
export function dcToAcDerate(userSolarData: UserSolarData) {
    return userSolarData.dcToAcDerate / 100;
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
    return (userSolarData.panelCount * userSolarData.panelCapacityWatts) / 1000;
}

/*
    Units: $
*/
export function installationCostCalc(userSolarData: UserSolarData) {
    return userSolarData.installationCostPerWatt * installationSizeCalc(userSolarData) * 1000;
}

/*
    Units: []kWh
    Division by 100 because dcToAcDerate in percent
*/
export function yearlyEnergyAcProductionKwh(userSolarData: UserSolarData) {
    const energyProduction: number[] = [];
    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        energyProduction.push(
            userSolarData.yearlyEnergyDcKwh *
                panelCapacityRatioCalc(userSolarData) *
                dcToAcDerate(userSolarData) *
                yearlyPanelEfficiencyDecline(userSolarData) ** i
        );
    }

    return energyProduction;
}

/*
    Units: kWh
*/
export function yearlyEnergyConsumptionKwh(userSolarData: UserSolarData) {
    return (userSolarData.averageMonthlyEnergyBill / userSolarData.energyCostPerKwh) * 12;
}

/*
    Units: %
*/
export function energyCoveredCalc(userSolarData: UserSolarData) {
    return (yearlyEnergyAcProductionKwh(userSolarData)[0] / yearlyEnergyConsumptionKwh(userSolarData)) * 100;
}

/*
    Units: $
*/
export function yearlyUtilityBillEstimates(userSolarData: UserSolarData) {
    const utilityBillEstimates: number[] = [];
    const energyProduction: number[] = yearlyEnergyAcProductionKwh(userSolarData);
    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        utilityBillEstimates.push(
            Math.max(
                ((yearlyEnergyConsumptionKwh(userSolarData) - energyProduction[i]) *
                    userSolarData.energyCostPerKwh *
                    yearlyEnergyCostIncrease(userSolarData) ** i) /
                    yearlyDiscountRate(userSolarData) ** i,
                0
            )
        );
    }

    return utilityBillEstimates;
}

/*
    Units: $
*/
export function costWithSolarInstallation(userSolarData: UserSolarData) {
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(userSolarData);
    return (
        installationCostCalc(userSolarData) +
        utilityBillEstimates.reduce((x, y) => x + y, 0) -
        userSolarData.solarIncentives
    );
}

/*
    Units: $
*/
export function yearlyCostWithoutSolar(userSolarData: UserSolarData) {
    const costWithoutSolar: number[] = [];
    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        costWithoutSolar.push(
            (userSolarData.averageMonthlyEnergyBill * 12 * yearlyEnergyCostIncrease(userSolarData) ** i) /
                yearlyDiscountRate(userSolarData) ** i
        );
    }

    return costWithoutSolar;
}

/*
    Units: $
*/
export function costWithoutSolarInstallation(userSolarData: UserSolarData) {
    const costWithoutSolar: number[] = yearlyCostWithoutSolar(userSolarData);
    return costWithoutSolar.reduce((x, y) => x + y, 0);
}

export function getBreakEvenYear(userSolarData: UserSolarData) {
    let breakEvenYear: number = 0;

    let costWithSolar = 0;
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(userSolarData);
    const cumulativeCostWithSolar: number[] = [];
    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        costWithSolar +=
            i == 0
                ? utilityBillEstimates[i] + installationCostCalc(userSolarData) - userSolarData.solarIncentives
                : utilityBillEstimates[i];
        cumulativeCostWithSolar.push(costWithSolar);
    }

    let costWithoutSolar = 0;
    const yearlyCostWithoutSolarEstimates: number[] = yearlyCostWithoutSolar(userSolarData);
    const cumulativeCostWithoutSolar: number[] = [];
    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        costWithoutSolar += yearlyCostWithoutSolarEstimates[i];
        cumulativeCostWithoutSolar.push(costWithoutSolar);
    }

    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        breakEvenYear++;
        if (cumulativeCostWithSolar[i] < cumulativeCostWithoutSolar[i]) break;
    }

    if (breakEvenYear == userSolarData.installationLifespan) {
        if (
            cumulativeCostWithSolar[userSolarData.installationLifespan - 1] >
            cumulativeCostWithoutSolar[userSolarData.installationLifespan - 1]
        ) {
            return -1;
        }
    }

    return breakEvenYear;
}

export function makeCumulativeCostWithoutSolar(userSolarData: UserSolarData) {
    const yearlyCostWithoutSolarEstimates: number[] = yearlyCostWithoutSolar(userSolarData);
    const cumulativeCostWithoutSolar: number[] = [];
    let cumulation = 0;

    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        cumulation += yearlyCostWithoutSolarEstimates[i];
        cumulativeCostWithoutSolar.push(Math.round(cumulation));
    }

    return cumulativeCostWithoutSolar;
}

export function makeCumulativeCostWithSolar(userSolarData: UserSolarData) {
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(userSolarData);
    const cumulativeCostWithSolar: number[] = [];
    let cumulation = 0;

    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        cumulation +=
            i == 0
                ? utilityBillEstimates[i] + installationCostCalc(userSolarData) - userSolarData.solarIncentives
                : utilityBillEstimates[i];
        cumulativeCostWithSolar.push(Math.round(cumulation));
    }

    return cumulativeCostWithSolar;
}
