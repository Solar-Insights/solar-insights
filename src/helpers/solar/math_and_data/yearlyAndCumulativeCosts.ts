import { UserSolarData } from "@/helpers/types";
import {
    yearlyEnergyCostIncrease,
    yearlyDiscountRate,
    yearlyUtilityBillEstimates,
    installationCostCalc
} from "@/helpers/solar/math_and_data/solarDataMath";

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
