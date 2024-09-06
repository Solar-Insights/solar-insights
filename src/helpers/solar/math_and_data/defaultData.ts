import { LayerId, MapSettings, SolarDataType } from "geo-env-typing/solar";
import { TimeParameters, UserSolarData, FinancialParameters, PanelParameters } from "@/helpers/types";

export namespace DefaultUserSolarData {
    export const YEARLY_ENERGY_DC_KWH = 0;
    export const PANEL_COUNT = 0;
    export const MIN_PANEL_COUNT = 0;
    export const MAX_PANEL_COUNT = 1;
}

export function makeDefaultUserSolarDataObject(): UserSolarData {
    return {
        maxPanelCount: DefaultUserSolarData.MAX_PANEL_COUNT,
        minPanelCount: DefaultUserSolarData.MIN_PANEL_COUNT,
        panelCount: DefaultUserSolarData.PANEL_COUNT,
        yearlyEnergyDcKwh: DefaultUserSolarData.YEARLY_ENERGY_DC_KWH,
    };
}

export namespace DefaultFinancialParameters {
    export const INSTALLATION_COST_PER_WATT = 3.0;
    export const AVERAGE_MONTHLY_ENERGY_BILL = 200;
    export const ENERGY_COST_PER_KWH = 0.155;
    export const SOLAR_INCENTIVES = 5000;
    export const YEARLY_ENERGY_COST_INCREASE = 2.5;
    export const YEARLY_DISCOUNT_RATE = 4;
    export const INSTALLATION_LIFESPAN = 25;
};

export function makeDefaultFinancialParameters(): FinancialParameters {
    return {
        installationCostPerWatt: DefaultFinancialParameters.INSTALLATION_COST_PER_WATT,
        averageMonthlyEnergyBill: DefaultFinancialParameters.AVERAGE_MONTHLY_ENERGY_BILL,
        energyCostPerKwh: DefaultFinancialParameters.ENERGY_COST_PER_KWH,
        solarIncentives: DefaultFinancialParameters.SOLAR_INCENTIVES,
        yearlyEnergyCostIncrease: DefaultFinancialParameters.YEARLY_ENERGY_COST_INCREASE,
        yearlyDiscountRate: DefaultFinancialParameters.YEARLY_DISCOUNT_RATE,
        installationLifespan: DefaultFinancialParameters.INSTALLATION_LIFESPAN
    };
}

export namespace DefaultPanelParameters {
    export const PANEL_CAPACITY_WATTS = 300;
    export const DEFAULT_PANEL_CAPACITY_WATTS = 400;
    export const YEARLY_PANEL_EFFICIENCY_DECLINE = 0.75;
    export const DC_TO_AC_DERATE = 85;
};

export function makeDefaultPanelParameters(): PanelParameters {
    return {
        panelCapacityWatts: DefaultPanelParameters.PANEL_CAPACITY_WATTS,
        defaultPanelCapacityWatts: DefaultPanelParameters.DEFAULT_PANEL_CAPACITY_WATTS,
        dcToAcDerate: DefaultPanelParameters.DC_TO_AC_DERATE,
        yearlyPanelEfficiencyDecline: DefaultPanelParameters.YEARLY_PANEL_EFFICIENCY_DECLINE,
    };
}

export namespace DefaultSolarMapSettings {
    export const LAYER_ID: LayerId = "annualFlux";
    export const LAYER_ID_CHOICES: SolarDataType[] = [
        { name: "annualFlux", displayedName: "Annual" },
        { name: "monthlyFlux", displayedName: "Monthly" },
        { name: "hourlyShade", displayedName: "Daily" }
    ];
    export const SHOW_PANELS = true;
    export const SHOW_HEATMAP = true;
    export const HEATMAP_ANIMATION = true;
}

export function makeDefaultMapSettings() {
    return {
        layerId: DefaultSolarMapSettings.LAYER_ID,
        layerIdChoices: DefaultSolarMapSettings.LAYER_ID_CHOICES,
        showPanels: DefaultSolarMapSettings.SHOW_PANELS,
        showHeatmap: DefaultSolarMapSettings.SHOW_HEATMAP,
        heatmapAnimation: DefaultSolarMapSettings.HEATMAP_ANIMATION
    } as MapSettings;
}

export function makeDefaultTimeParams() {
    return {
        tick: 0,
        month: 0,
        day: 1,
        hour: 0
    } as TimeParameters;
}
