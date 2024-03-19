import { BuildingInsights } from "geo-env-typing/solar";
import { UserSolarData } from "@/helpers/types";
import { panelCapacityRatioCalc, dcToAcDerate, yearlyEnergyConsumptionKwh } from "@/helpers/solar/solarDataMath";
import { makeCumulativeCostWithSolar, makeCumulativeCostWithoutSolar } from "@/helpers/solar/yearlyAndCumulativeCosts";

export function getOptimizedEnergyCoveredConfigId(buildingInsights: BuildingInsights, userSolarData: UserSolarData) {
    let configId: number | undefined;

    for (let i = 0; i < buildingInsights.solarPotential.solarPanelConfigs.length; i++) {
        if (
            buildingInsights.solarPotential.solarPanelConfigs[i].yearlyEnergyDcKwh *
                panelCapacityRatioCalc(userSolarData) *
                dcToAcDerate(userSolarData) >=
            yearlyEnergyConsumptionKwh(userSolarData)
        ) {
            configId = i;
            break;
        }
    }

    return configId;
}

export function getOptimizedSavingsConfigId(buildingInsights: BuildingInsights, userSolarData: UserSolarData) {
    let configId: number | undefined;
    let maxSavings: number = 0;

    for (let i = 0; i < buildingInsights.solarPotential.solarPanelConfigs.length; i++) {
        const userSolarDataForSpecificConfigId: UserSolarData = createUserSolarDataForSpecificConfigId(
            buildingInsights,
            userSolarData,
            i
        );
        const finalCumulativeCostWithSolar: number = makeCumulativeCostWithSolar(
            userSolarDataForSpecificConfigId
        ).pop()!;
        const finalCumulativeCostWithoutSolar: number = makeCumulativeCostWithoutSolar(
            userSolarDataForSpecificConfigId
        ).pop()!;
        const solarSavings = finalCumulativeCostWithoutSolar - finalCumulativeCostWithSolar;

        if (i === 0) {
            maxSavings = solarSavings;
        } else if (solarSavings < maxSavings) {
            configId = i;
            break;
        } else {
            maxSavings = solarSavings;
        }
    }

    return configId;
}

function createUserSolarDataForSpecificConfigId(
    buildingInsights: BuildingInsights,
    userSolarData: UserSolarData,
    configId: number
) {
    const userSolarDataCopy: UserSolarData = JSON.parse(JSON.stringify(userSolarData));
    // Only these parameters change based on the configId
    userSolarDataCopy.panelCount = buildingInsights.solarPotential.solarPanelConfigs[configId].panelsCount;
    userSolarDataCopy.yearlyEnergyDcKwh = buildingInsights.solarPotential.solarPanelConfigs[configId].yearlyEnergyDcKwh;

    return userSolarDataCopy;
}
