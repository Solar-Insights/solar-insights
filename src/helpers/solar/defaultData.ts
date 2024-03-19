import { LayerId, MapSettings, SolarDataType } from "geo-env-typing/solar";
import { TimeParameters, UserSolarData } from "@/helpers/types";

export namespace DefaultUserSolarData {
    export const PANEL_COUNT = 0;
    export const MIN_PANEL_COUNT = 0;
    export const MAX_PANEL_COUNT = 1;
    export const PANEL_CAPACITY_WATTS = 300;
    export const DEFAULT_PANEL_CAPACITY_WATTS = 400;
    export const INSTALLATION_COST_PER_WATT = 3.0;
    export const YEARLY_ENERGY_DC_KWH = 0;
    export const DC_TO_AC_DERATE = 85;
    export const AVERAGE_MONTHLY_ENERGY_BILL = 200;
    export const ENERGY_COST_PER_KWH = 0.155;
    export const SOLAR_INCENTIVES = 5000;
    export const YEARLY_PANEL_EFFICIENCY_DECLINE = 0.75;
    export const YEARLY_ENERGY_COST_INCREASE = 2.5;
    export const YEARLY_DISCOUNT_RATE = 4;
    export const INSTALLATION_LIFESPAN = 25;
}

export function makeDefaultUserSolarDataObject() {
    return {
        panelCount: DefaultUserSolarData.PANEL_COUNT,
        minPanelCount: DefaultUserSolarData.MIN_PANEL_COUNT,
        maxPanelCount: DefaultUserSolarData.MAX_PANEL_COUNT,
        panelCapacityWatts: DefaultUserSolarData.PANEL_CAPACITY_WATTS,
        defaultPanelCapacityWatts: DefaultUserSolarData.DEFAULT_PANEL_CAPACITY_WATTS,
        installationCostPerWatt: DefaultUserSolarData.INSTALLATION_COST_PER_WATT,
        yearlyEnergyDcKwh: DefaultUserSolarData.YEARLY_ENERGY_DC_KWH,
        dcToAcDerate: DefaultUserSolarData.DC_TO_AC_DERATE,
        averageMonthlyEnergyBill: DefaultUserSolarData.AVERAGE_MONTHLY_ENERGY_BILL,
        energyCostPerKwh: DefaultUserSolarData.ENERGY_COST_PER_KWH,
        solarIncentives: DefaultUserSolarData.SOLAR_INCENTIVES,
        yearlyPanelEfficiencyDecline: DefaultUserSolarData.YEARLY_PANEL_EFFICIENCY_DECLINE,
        yearlyEnergyCostIncrease: DefaultUserSolarData.YEARLY_ENERGY_COST_INCREASE,
        yearlyDiscountRate: DefaultUserSolarData.YEARLY_DISCOUNT_RATE,
        installationLifespan: DefaultUserSolarData.INSTALLATION_LIFESPAN
    } as UserSolarData;
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
    export const CONFIG_ID_INDEX = 0;
}

export function makeDefaultMapSettings() {
    return {
        layerId: DefaultSolarMapSettings.LAYER_ID,
        layerIdChoices: DefaultSolarMapSettings.LAYER_ID_CHOICES,
        showPanels: DefaultSolarMapSettings.SHOW_PANELS,
        showHeatmap: DefaultSolarMapSettings.SHOW_HEATMAP,
        heatmapAnimation: DefaultSolarMapSettings.HEATMAP_ANIMATION,
        configIdIndex: DefaultSolarMapSettings.CONFIG_ID_INDEX
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
