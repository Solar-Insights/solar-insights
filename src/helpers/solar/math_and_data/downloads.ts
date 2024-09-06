import { saveFileToLocal } from "@/helpers/downloadFile";
import { FinancialParameters, InstallationExportOptions, PanelParameters, UserSolarData } from "@/helpers/types";
import { BuildingInsights, SolarPanelConfig } from "geo-env-typing/solar";
import {
    costWithSolarInstallation,
    energyCoveredCalc,
    installationCostCalc,
    yearlyEnergyCalc
} from "@/helpers/solar/math_and_data/solarDataMath";
import { costWithoutSolarInstallation, getBreakEvenYear } from "./yearlyAndCumulativeCosts";

export function downloadInstallationData(
    exportOptions: InstallationExportOptions,
    buildingInsights: BuildingInsights,
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    panelParameters: PanelParameters,
    panelConfig: SolarPanelConfig,
    address: string
) {
    const data = createExportedInstallationData(
        exportOptions,
        buildingInsights,
        userSolarData,
        financialParameters,
        panelParameters,
        panelConfig,
        address
    );

    const suggestedName = `Solar installation - ${address}`;
    saveFileToLocal(data, suggestedName, exportOptions.exportType);
}

function createExportedInstallationData(
    exportOptions: InstallationExportOptions,
    buildingInsights: BuildingInsights,
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    panelParameters: PanelParameters,
    panelConfig: SolarPanelConfig,
    address: string
) {
    const data = {};

    addMetadataToObject(data, address, buildingInsights);

    if (exportOptions.solarInsightsAndParameters)
        addSolarInsightsAndParametersToObject(data, userSolarData, financialParameters, panelParameters);

    if (exportOptions.panelConfiguration) addPanelConfigurationToObject(data, buildingInsights, panelConfig);

    return data;
}

function addMetadataToObject(data: any, address: string, buildingInsights: BuildingInsights) {
    data.metadata = {
        address: address,
        regionCode: buildingInsights.regionCode,
        postalCode: buildingInsights.postalCode,
        administrativeArea: buildingInsights.administrativeArea,
        coordinates: buildingInsights.center,
        boudingBox: buildingInsights.boundingBox,
        imageryDate: buildingInsights.imageryProcessedDate,
        imageryQuality: buildingInsights.imageryQuality,
        roofAreaSquareMeters: buildingInsights.solarPotential.wholeRoofStats.areaMeters2,
        yearlySunshineHours: buildingInsights.solarPotential.maxSunshineHoursPerYear
    };
}

function addSolarInsightsAndParametersToObject(
    data: any,
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    panelParameters: PanelParameters
) {
    data.parameters = userSolarData;
    data.solarInsights = {};

    data.solarInsights.installation = {
        yearlyEnergyKwh: yearlyEnergyCalc(userSolarData, panelParameters),
        installationCost: installationCostCalc(userSolarData, financialParameters, panelParameters),
        energyCoveredPercentage: energyCoveredCalc(userSolarData, financialParameters, panelParameters)
    };

    const costWithoutSolar = costWithoutSolarInstallation(financialParameters);
    const costWithSolar = costWithSolarInstallation(userSolarData, financialParameters, panelParameters);
    const totalSavedCost = costWithoutSolar - costWithSolar;
    const breakevenYear =
        getBreakEvenYear(userSolarData, financialParameters, panelParameters) + new Date().getFullYear();

    data.solarInsights.costAnalysis = {
        installationLifespan: financialParameters.installationLifespan,
        costWithoutSolar: costWithoutSolar,
        costWithSolar: costWithSolar,
        totalSavedCost: totalSavedCost,
        breakevenYear: breakevenYear
    };
}

function addPanelConfigurationToObject(data: any, buildingInsights: BuildingInsights, panelConfig: SolarPanelConfig) {
    const panels = [];
    for (let i = 0; i < panelConfig.panelsCount; i++) {
        panels.push(buildingInsights.solarPotential.solarPanels[i]);
    }

    data.panelConfiguration = {
        solarPanelConfiguration: panelConfig,
        panels: panels
    };
}
