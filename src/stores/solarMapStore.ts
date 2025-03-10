import { defineStore } from "pinia";
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, SolarPanelConfig, MapSettings, SolarLayers } from "geo-env-typing/solar";
import { FinancialParameters, PanelParameters, SolarReadonlyPanel, UserSolarData } from "@/helpers/types";
import {
    makeDefaultUserSolarDataObject,
    makeDefaultMapSettings,
    makeDefaultFinancialParameters,
    makeDefaultPanelParameters
} from "@/helpers/solar/math_and_data/defaultData";
import { getClosestBuildingInsights } from "@/api/solar";
import {
    getOptimizedEnergyCoveredConfigId,
    getOptimizedSavingsConfigId
} from "@/helpers/solar/math_and_data/optimizeSolarConfig";
import { monthlyEnergyBillApproximation } from "@/helpers/solar/math_and_data/solarDataMath";
import { objectHasValue } from "@/helpers/componentConditionals";
import { useSolarMapVisualsStore } from "@/stores/solarMapVisualsStore";
import { getLayersFromBuildingInsights } from "@/helpers/solar/map/layers";

export const useSolarMapStore = defineStore("solarMapStore", {
    state: () => ({
        // User preferences
        mapSettings: {} as MapSettings,
        financialParameters: {} as FinancialParameters,
        panelParameters: {} as PanelParameters,
        solarReadonlyPanel: "INSIGHTS_READONLY" as SolarReadonlyPanel | undefined,

        // Single request data
        centerCoord: { lat: NaN, lng: NaN } as LatLng,
        address: "",
        buildingInsights: {} as BuildingInsights,
        layers: {} as SolarLayers,
        userSolarData: {} as UserSolarData,
        configIdIndex: 0
    }),

    actions: {
        setDefaultParametersAndSettings() {
            !objectHasValue(this.mapSettings) ? this.setDefaultMapSettings() : false;
            !objectHasValue(this.financialParameters) ? this.setDefaultFinancialParameters() : false;
            !objectHasValue(this.panelParameters) ? this.setDefaultPanelParameters() : false;

            this.setDefaultUserSolarData();
        },

        setDefaultMapSettings() {
            this.mapSettings = makeDefaultMapSettings();
        },

        setDefaultFinancialParameters() {
            this.financialParameters = makeDefaultFinancialParameters();
            this.setDynamicFinancialParameters();
        },

        setDynamicFinancialParameters() {
            this.financialParameters.averageMonthlyEnergyBill = monthlyEnergyBillApproximation(
                this.buildingInsights.solarPotential.wholeRoofStats.areaMeters2
            );
        },

        setDefaultPanelParameters() {
            this.panelParameters = makeDefaultPanelParameters();
            this.setDynamicPanelParameters();
        },

        setDynamicPanelParameters() {
            this.panelParameters.defaultPanelCapacityWatts = this.buildingInsights.solarPotential.panelCapacityWatts;
        },

        setDefaultUserSolarData() {
            this.userSolarData = makeDefaultUserSolarDataObject();
            this.setDynamicUserSolarData();
        },

        setDynamicUserSolarData() {
            this.userSolarData.minPanelCount = this.buildingInsights.solarPotential.solarPanelConfigs[0].panelsCount;
            this.userSolarData.maxPanelCount =
                this.buildingInsights.solarPotential.solarPanelConfigs[
                    this.buildingInsights.solarPotential.solarPanelConfigs.length - 1
                ].panelsCount;
        },

        removeRequestData() {
            this.centerCoord = { lat: NaN, lng: NaN };
            this.address = "";
            this.buildingInsights = {} as BuildingInsights;
            this.userSolarData = {} as UserSolarData;
            this.configIdIndex = 0;
            this.layers = {} as SolarLayers;
        },

        async makeNewSolarInstallationRequest(coords: LatLng, address: string) {
            this.centerCoord = coords;
            this.address = address;

            await getClosestBuildingInsights(coords).then(async (data: BuildingInsights) => {
                this.buildingInsights = data;
            });
        },

        async makeLayersRequest() {
            this.layers = await getLayersFromBuildingInsights(this.buildingInsights);
        },

        async syncDataOnLoad() {
            this.syncDynamicParameters();
        },

        syncDynamicParameters() {
            this.setDynamicUserSolarData();
            this.setDynamicFinancialParameters();
            this.setDynamicPanelParameters();
            this.setOptimizedSavingsConfig();
        },

        setOptimizedEnergyCoveredConfig() {
            const configId: number | undefined = getOptimizedEnergyCoveredConfigId(
                this.buildingInsights,
                this.financialParameters,
                this.panelParameters
            );
            this.setConfigId(configId);
        },

        setOptimizedSavingsConfig() {
            const configId: number | undefined = getOptimizedSavingsConfigId(
                this.buildingInsights,
                this.userSolarData,
                this.financialParameters,
                this.panelParameters
            );
            this.setConfigId(configId);
        },

        setConfigId(newConfigId: number | undefined) {
            if (newConfigId === undefined) {
                this.configIdIndex = this.buildingInsights.solarPotential.solarPanelConfigs.length - 1;
            } else {
                this.configIdIndex = newConfigId;
            }

            this.panelCountChange();
        },

        async panelCountChange() {
            if (this.buildingInsights == null) {
                return;
            }

            this.userSolarData.panelCount =
                this.buildingInsights.solarPotential.solarPanelConfigs[this.configIdIndex].panelsCount;

            useSolarMapVisualsStore().panelCountChange(this.buildingInsights, this.configIdIndex, this.mapSettings);

            this.setNewPanelConfig();
        },

        setNewPanelConfig() {
            const panelConfig: SolarPanelConfig =
                this.buildingInsights.solarPotential.solarPanelConfigs[this.configIdIndex];
            this.userSolarData.yearlyEnergyDcKwh = panelConfig.yearlyEnergyDcKwh;
            this.userSolarData.panelCount = panelConfig.panelsCount;
        },

        selectReadonlyPanelToDisplay(buttonClicked: SolarReadonlyPanel) {
            if (!this.solarReadonlyPanel) {
                this.solarReadonlyPanel = buttonClicked;
            } else if (this.solarReadonlyPanel === "BUILDING_READONLY") {
                this.solarReadonlyPanel = this.solarReadonlyPanel === buttonClicked ? undefined : "INSIGHTS_READONLY";
            } else if (this.solarReadonlyPanel === "INSIGHTS_READONLY") {
                this.solarReadonlyPanel = this.solarReadonlyPanel === buttonClicked ? undefined : "BUILDING_READONLY";
            }
        },

        setReadonlyPanelToDisplay(buttonClicked: SolarReadonlyPanel | undefined) {
            this.solarReadonlyPanel = buttonClicked;
        }
    },

    persist: true
});
