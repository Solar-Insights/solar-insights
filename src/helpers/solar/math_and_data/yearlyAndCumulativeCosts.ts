import { FinancialParameters, PanelParameters, UserSolarData } from "@/helpers/types";
import {
    yearlyEnergyCostIncrease,
    yearlyDiscountRate,
    yearlyUtilityBillEstimates,
    installationCostCalc
} from "@/helpers/solar/math_and_data/solarDataMath";

/*
    Units: $
*/
export function yearlyCostWithoutSolar(financialParameters: FinancialParameters) {
    const costWithoutSolar: number[] = [];
    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        costWithoutSolar.push(
            (financialParameters.averageMonthlyEnergyBill * 12 * yearlyEnergyCostIncrease(financialParameters) ** i) /
                yearlyDiscountRate(financialParameters) ** i
        );
    }

    return costWithoutSolar;
}

/*
    Units: $
*/
export function costWithoutSolarInstallation(financialParameters: FinancialParameters) {
    const costWithoutSolar: number[] = yearlyCostWithoutSolar(financialParameters);
    return costWithoutSolar.reduce((x, y) => x + y, 0);
}

export function getBreakEvenYear(
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    panelParameters: PanelParameters
) {
    let breakEvenYear: number = 0;

    let costWithSolar = 0;
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(
        userSolarData,
        financialParameters,
        panelParameters
    );
    const cumulativeCostWithSolar: number[] = [];
    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        costWithSolar +=
            i == 0
                ? utilityBillEstimates[i] +
                  installationCostCalc(userSolarData, financialParameters, panelParameters) -
                  financialParameters.solarIncentives
                : utilityBillEstimates[i];
        cumulativeCostWithSolar.push(costWithSolar);
    }

    let costWithoutSolar = 0;
    const yearlyCostWithoutSolarEstimates: number[] = yearlyCostWithoutSolar(financialParameters);
    const cumulativeCostWithoutSolar: number[] = [];
    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        costWithoutSolar += yearlyCostWithoutSolarEstimates[i];
        cumulativeCostWithoutSolar.push(costWithoutSolar);
    }

    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        breakEvenYear++;
        if (cumulativeCostWithSolar[i] < cumulativeCostWithoutSolar[i]) break;
    }

    if (breakEvenYear == financialParameters.installationLifespan) {
        if (
            cumulativeCostWithSolar[financialParameters.installationLifespan - 1] >
            cumulativeCostWithoutSolar[financialParameters.installationLifespan - 1]
        ) {
            return -1;
        }
    }

    return breakEvenYear;
}

export function makeCumulativeCostWithoutSolar(userSolarData: UserSolarData, financialParameters: FinancialParameters) {
    const yearlyCostWithoutSolarEstimates: number[] = yearlyCostWithoutSolar(financialParameters);
    const cumulativeCostWithoutSolar: number[] = [];
    let cumulation = 0;

    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        cumulation += yearlyCostWithoutSolarEstimates[i];
        cumulativeCostWithoutSolar.push(Math.round(cumulation));
    }

    return cumulativeCostWithoutSolar;
}

export function makeCumulativeCostWithSolar(
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    panelParameters: PanelParameters
) {
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(
        userSolarData,
        financialParameters,
        panelParameters
    );
    const cumulativeCostWithSolar: number[] = [];
    let cumulation = 0;

    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        cumulation +=
            i == 0
                ? utilityBillEstimates[i] +
                  installationCostCalc(userSolarData, financialParameters, panelParameters) -
                  financialParameters.solarIncentives
                : utilityBillEstimates[i];
        cumulativeCostWithSolar.push(Math.round(cumulation));
    }

    return cumulativeCostWithSolar;
}
