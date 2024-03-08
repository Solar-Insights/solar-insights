<template>
    <div class="d-flex">
        <v-card id="map-details" class="rounded-0" :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'">
            <map-header :coord="coordRef" @sync-with-new-request="syncWithNewRequest"/>

            <div :class="$vuetify.display.xs ? 'map-data-mobile' : 'map-data-computer'">
                <div class="mb-4">
                    <v-btn
                        @click="solarReadonlyPanel = 0"
                        class="w-50"
                        :class="solarReadonlyPanel == 0 ? 'button-selection-border' : ''"
                        :prepend-icon="solarReadonlyPanel == 0 ? 'mdi-home' : 'mdi-home-outline'"
                        variant="outlined"
                        :ripple="false"
                    >
                        Building
                    </v-btn>
                    <v-btn
                        @click="solarReadonlyPanel = 1"
                        class="w-50"
                        :class="solarReadonlyPanel == 1 ? 'button-selection-border' : ''"
                        :prepend-icon="solarReadonlyPanel == 1 ? 'mdi-transmission-tower' : 'mdi-transmission-tower'"
                        variant="outlined"
                        :ripple="false"
                    >
                        Insights
                    </v-btn>
                </div>

                <v-expansion-panels variant="accordion">
                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                            <v-icon class="mr-3">mdi-solar-power-variant-outline</v-icon> <span class="my-auto"> Panels </span>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <div class="detail-text mb-3">
                                Solar panels are ordered from most to least efficient based annual sunlight of the roof
                                (e.g. an input of 10 panels will use the 10 most efficient)
                            </div>

                            <div>
                                <div class="d-flex">
                                    <span class="me-auto"> Count </span>
                                    <span class="text-right">
                                        {{
                                            buildingInsights.solarPotential === undefined
                                                ? 0
                                                : buildingInsights.solarPotential.solarPanelConfigs[
                                                      mapSettings.configIdIndex
                                                  ].panelsCount
                                        }}
                                        / {{ userSolarData.maxPanelCount }} panels
                                    </span>
                                </div>
                                <v-slider
                                    v-model="mapSettings.configIdIndex"
                                    @end="panelCountChange"
                                    :min="0"
                                    :max="
                                        buildingInsights.solarPotential === undefined
                                            ? 1
                                            : buildingInsights.solarPotential.solarPanelConfigs.length - 1
                                    "
                                    step="1"
                                    color="theme"
                                />
                            </div>

                            <div>
                                <v-text-field
                                    v-model="userSolarData.panelCapacityWatts"
                                    label="Power rating (capacity)"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    type="number"
                                    prepend-inner-icon="mdi-lightning-bolt"
                                >
                                    <template v-slot:append-inner> Watts </template>
                                </v-text-field>
                            </div>

                            <div class="w-100 text-center mb-2">
                                <v-chip
                                    @click="
                                        advancedSettingsPanels.length == 0
                                            ? (advancedSettingsPanels = ['advanced-settings-panels'])
                                            : (advancedSettingsPanels = [])
                                    "
                                    color="theme"
                                    variant="text"
                                    :append-icon="advancedSettingsPanels.length == 0 ? 'mdi-menu-down' : 'mdi-menu-up'"
                                >
                                    Advanced Settings
                                </v-chip>
                            </div>

                            <v-expansion-panels v-model="advancedSettingsPanels">
                                <v-expansion-panel value="advanced-settings-panels" class="mb-2" elevation="0">
                                    <v-expansion-panel-text class="px-0" id="expansion-panel-second-layer">
                                        <v-text-field
                                            v-model="userSolarData.dcToAcDerate"
                                            label="DC to AC conversion"
                                            density="compact"
                                            variant="outlined"
                                            color="theme"
                                            type="number"
                                            prepend-inner-icon="mdi-handshake"
                                        >
                                            <template v-slot:append-inner> % </template>
                                        </v-text-field>

                                        <v-text-field
                                            v-model="userSolarData.yearlyPanelEfficiencyDecline"
                                            label="Panel efficiency decline per year"
                                            density="compact"
                                            variant="outlined"
                                            color="theme"
                                            type="number"
                                            prepend-inner-icon="mdi-elevation-decline"
                                        >
                                            <template v-slot:append-inner> % </template>
                                        </v-text-field>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                            <v-icon class="mr-3">mdi-cash</v-icon> <span class="my-auto"> Costs and Incentives </span>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <div class="detail-text mb-3">
                                Costs and incentives are used to evaluate the financial benefits of solar panels for a specific
                                building
                            </div>

                            <div>
                                <v-text-field
                                    v-model="userSolarData.averageMonthlyEnergyBill"
                                    label="Average monthly energy cost"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    type="number"
                                    prepend-inner-icon="mdi-calendar-month-outline"
                                >
                                    <template v-slot:append-inner> $ </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="userSolarData.energyCostPerKwh"
                                    label="Energy cost per kWh"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    type="number"
                                    prepend-inner-icon="mdi-currency-usd"
                                >
                                    <template v-slot:append-inner> $ </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="userSolarData.installationCostPerWatt"
                                    label="Installation cost per Watt"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    type="number"
                                    prepend-inner-icon="mdi-hammer"
                                >
                                    <template v-slot:append-inner> $ </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="userSolarData.solarIncentives"
                                    label="Solar incentives"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    type="number"
                                    prepend-inner-icon="mdi-handshake"
                                >
                                    <template v-slot:append-inner> $ </template>
                                </v-text-field>
                            </div>

                            <div class="w-100 text-center mb-2">
                                <v-chip
                                    @click="
                                        advancedSettingsSolarPotential.length == 0
                                            ? (advancedSettingsSolarPotential = ['advanced-settings-solar-potential'])
                                            : (advancedSettingsSolarPotential = [])
                                    "
                                    color="theme"
                                    variant="text"
                                    :append-icon="
                                        advancedSettingsSolarPotential.length == 0 ? 'mdi-menu-down' : 'mdi-menu-up'
                                    "
                                >
                                    Advanced Settings
                                </v-chip>
                            </div>

                            <v-expansion-panels v-model="advancedSettingsSolarPotential">
                                <v-expansion-panel value="advanced-settings-solar-potential" class="mb-2" elevation="0">
                                    <v-expansion-panel-text class="px-0" id="expansion-panel-second-layer">
                                        <v-text-field
                                            v-model="userSolarData.yearlyEnergyCostIncrease"
                                            label="Energy cost increase per year"
                                            density="compact"
                                            variant="outlined"
                                            color="theme"
                                            type="number"
                                            prepend-inner-icon="mdi-chart-line-variant"
                                        >
                                            <template v-slot:append-inner> % </template>
                                        </v-text-field>

                                        <v-text-field
                                            v-model="userSolarData.yearlyDiscountRate"
                                            label="Discount rate per year"
                                            density="compact"
                                            variant="outlined"
                                            color="theme"
                                            type="number"
                                            prepend-inner-icon="mdi-cart-percent"
                                        >
                                            <template v-slot:append-inner> % </template>
                                        </v-text-field>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title v-ripple="{ class: 'text-theme' }">
                            <v-icon class="mr-3">mdi-cog-outline</v-icon> <span class="my-auto"> Settings </span>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <div class="detail-text mb-3">
                                Settings to control what information is currently being displayed on the map
                            </div>

                            <div>
                                <v-select
                                    v-model="mapSettings.layerId"
                                    item-title="displayedName"
                                    item-value="name"
                                    :items="mapSettings.layerIdChoices"
                                    label="Displayed solar data"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    prepend-inner-icon="mdi-magnify"
                                >
                                </v-select>

                                <v-switch v-model="mapSettings.showPanels" inset color="theme" density="compact">
                                    <template v-slot:label>
                                        <span class="ml-4"> Display panels </span>
                                    </template>
                                </v-switch>

                                <v-switch
                                    v-model="mapSettings.showHeatmap"
                                    inset
                                    color="theme"
                                    density="compact"
                                    :disabled="!['monthlyFlux', 'hourlyShade'].includes(mapSettings.layerId)"
                                >
                                    <template v-slot:label>
                                        <span class="ml-4"> Display heatmap </span>
                                    </template>
                                </v-switch>

                                <v-switch
                                    v-model="mapSettings.heatmapAnimation"
                                    inset
                                    color="theme"
                                    density="compact"
                                    :disabled="
                                        !mapSettings.showHeatmap ||
                                        !['monthlyFlux', 'hourlyShade'].includes(mapSettings.layerId)
                                    "
                                >
                                    <template v-slot:label>
                                        <span class="ml-4"> Heatmap animation </span>
                                    </template>
                                </v-switch>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </v-card>

        <div id="map" class="w-100"></div>

        <v-slider
            v-if="mapSettings.layerId === 'monthlyFlux'"
            v-model="timeParams.month"
            @start="currentlySliding = true"
            @end="
                currentlySliding = false;
                timeParams.tick = timeParams.month;
            "
            :min="0"
            :max="11"
            step="1"
            hide-details
            color="theme"
            :class="$vuetify.display.xs ? 'time-slider-mobile' : 'time-slider-computer'"
            rounded
        >
            <template v-slot:append>
                <div class="ml-1" style="width: 50px">
                    {{ monthCodes[timeParams.month] }}
                </div>
            </template>
        </v-slider>

        <v-slider
            v-if="mapSettings.layerId === 'hourlyShade'"
            v-model="timeParams.hour"
            @start="currentlySliding = true"
            @end="
                currentlySliding = false;
                timeParams.tick = timeParams.hour;
            "
            :min="0"
            :max="23"
            step="1"
            hide-details
            color="theme"
            :class="$vuetify.display.xs ? 'time-slider-mobile' : 'time-slider-computer'"
        >
            <template v-slot:append>
                <div class="ml-1" style="width: 50px">
                    {{ hourCodes[timeParams.hour] }}
                </div>
            </template>
        </v-slider>

        <div v-if="Object.keys(buildingInsights).length">
            <BuildingReadonlyPanel
                v-if="solarReadonlyPanel == 0"
                :buildingInsights="buildingInsights"
                :userSolarData="userSolarData"
            />
            <InsightsReadonlyPanel
                v-if="solarReadonlyPanel == 1"
                :buildingInsights="buildingInsights"
                :userSolarData="userSolarData"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref, watch } from "vue";
// Helpers
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, SolarLayers, Layer, SolarPanelConfig, MapSettings } from "geo-env-typing/solar";
import { panelCapacityRatioCalc, dcToAcDerate, yearlyEnergyConsumptionKwh, normalize } from "@/helpers/solarMath";
import { TimeParameters, UserSolarData } from "@/helpers/types";
import { panelsPalette, monthCodes, hourCodes } from "@/helpers/constants";
import { initMapComponents } from "@/helpers/util";
import { rgbToColor, createPalette, getSingleLayer } from "@/helpers/solar";
// Server
import { getClosestBuildingInsights, getSolarLayers } from "@/server/solar";
// Components
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import InsightsReadonlyPanel from "@/components/solar/InsightsReadonlyPanel.vue";
import MapHeader from "@/components/general/MapHeader.vue";

const solarReadonlyPanel = ref(0);
const advancedSettingsPanels = ref([] as string[]);
const advancedSettingsSolarPotential = ref([] as string[]);
const currentlySliding = ref(false);
const timeParams = ref<TimeParameters>({
    tick: 0,
    month: 0,
    day: 1,
    hour: 0
});
const mapSettings = ref<MapSettings>({
    layerId: "annualFlux",
    layerIdChoices: [
        { name: "annualFlux", displayedName: "Annual" },
        { name: "monthlyFlux", displayedName: "Monthly" },
        { name: "hourlyShade", displayedName: "Daily" }
    ],
    showPanels: true,
    showHeatmap: true,
    heatmapAnimation: true,
    configIdIndex: 0
});

const buildingInsights = ref<BuildingInsights>({} as BuildingInsights);
const userSolarData = ref<UserSolarData>({
    panelCount: 0,
    minPanelCount: 0,
    maxPanelCount: 1,
    panelCapacityWatts: 350,
    defaultPanelCapacityWatts: 350,
    installationCostPerWatt: 4.0,
    yearlyEnergyDcKwh: 0,
    dcToAcDerate: 85,
    averageMonthlyEnergyBill: 300,
    energyCostPerKwh: 0.31,
    solarIncentives: 7000,
    yearlyPanelEfficiencyDecline: 0.5,
    yearlyEnergyCostIncrease: 2.2,
    yearlyDiscountRate: 4,
    installationLifespan: 25
});

let map: google.maps.Map;
let geometryLibrary: google.maps.GeometryLibrary;

const coordRef = ref<LatLng>({lat: 46.81701, lng: -71.36838});

onMounted(async () => {
    const coord: LatLng = { lat: 46.81701, lng: -71.36838 };
    ({ map } = await initMapComponents(coord, "SOLAR"));

    geometryLibrary = (await google.maps.importLibrary("geometry")) as google.maps.GeometryLibrary;

    setInterval(() => {
        handleTickChange();
    }, 1000);
});

function handleTickChange() {
    if (mapSettings.value.heatmapAnimation) {
        timeParams.value.tick++;
    }

    if (
        layer?.id === "monthlyFlux" &&
        mapSettings.value.heatmapAnimation &&
        mapSettings.value.showHeatmap &&
        !currentlySliding.value
    ) {
        timeParams.value.month = (timeParams.value.month + 1) % 12;
    } else if (
        layer?.id === "hourlyShade" &&
        mapSettings.value.heatmapAnimation &&
        mapSettings.value.showHeatmap &&
        !currentlySliding.value
    ) {
        timeParams.value.hour = (timeParams.value.hour + 1) % 24;
    }
}

watch(
    () => mapSettings.value.showPanels,
    async () => {
        await syncMapWithNewRequest();
    }
);

watch(
    () => mapSettings.value.layerId,
    async () => {
        await showDataLayer(true);
    }
);

watch(
    () => mapSettings.value.showHeatmap,
    async () => {
        mapSettings.value.showHeatmap ? await showDataLayer(true) : resetHeatmapLayer();
    }
);

watch(
    () => timeParams.value.tick,
    () => {
        if (layer?.id === "monthlyFlux" && mapSettings.value.showHeatmap) {
            displayMonthlyFlux();
        } else if (mapSettings.value.layerId === "hourlyShade" && mapSettings.value.showHeatmap) {
            displayhourlyShade();
        }
    }
);

async function syncWithNewRequest(coord: LatLng, formattedAddress: string) {
    map.setCenter(coord);

    await getClosestBuildingInsights(coord)
        .then((data: BuildingInsights) => {
            buildingInsights.value = data;
        })
        .catch(() => {
            // Handle error
        });

    syncTemplateVariableFollowingNewRequest();
    syncMapWithNewRequest();
    showDataLayer(true);
}

async function syncTemplateVariableFollowingNewRequest() {
    userSolarData.value.minPanelCount = buildingInsights.value.solarPotential.solarPanelConfigs[0].panelsCount;
    userSolarData.value.defaultPanelCapacityWatts = buildingInsights.value.solarPotential.panelCapacityWatts;
    userSolarData.value.maxPanelCount =
        buildingInsights.value.solarPotential.solarPanelConfigs[
            buildingInsights.value.solarPotential.solarPanelConfigs.length - 1
        ].panelsCount;

    mapSettings.value.configIdIndex = getConfigIdForFullEnergyCoverage();
}

async function panelCountChange() {
    userSolarData.value.panelCount =
        buildingInsights.value.solarPotential.solarPanelConfigs[mapSettings.value.configIdIndex].panelsCount;
    await syncMapWithNewRequest();
}

function getConfigIdForFullEnergyCoverage() {
    for (let i = 0; i < buildingInsights.value.solarPotential.solarPanelConfigs.length; i++) {
        if (
            buildingInsights.value.solarPotential.solarPanelConfigs[i].yearlyEnergyDcKwh *
                panelCapacityRatioCalc(userSolarData.value) *
                dcToAcDerate(userSolarData.value) >=
            yearlyEnergyConsumptionKwh(userSolarData.value)
        ) {
            return i;
        }
    }
    return buildingInsights.value.solarPotential.solarPanelConfigs.length - 1;
}

/*
    Solar panels
*/
let panelConfig: SolarPanelConfig | undefined;
let solarPanels: google.maps.Polygon[] = [];
async function syncMapWithNewRequest() {
    if (buildingInsights.value == null) {
        return;
    }

    removeSolarPanelsFromMap();
    setNewPanelConfig();
    addSolarPanelsToMap();
}

function removeSolarPanelsFromMap() {
    solarPanels.map((panel) => panel.setMap(null));
    solarPanels = [];
}

async function setNewPanelConfig() {
    panelConfig = buildingInsights.value.solarPotential.solarPanelConfigs[mapSettings.value.configIdIndex];
    userSolarData.value.yearlyEnergyDcKwh = panelConfig.yearlyEnergyDcKwh;
    userSolarData.value.panelCount = panelConfig.panelsCount;
}

function addSolarPanelsToMap() {
    const solarPotential = buildingInsights.value.solarPotential;
    const palette = createPalette(panelsPalette, 256).map(rgbToColor);
    const minEnergy = solarPotential.solarPanels.slice(-1)[0].yearlyEnergyDcKwh;
    const maxEnergy = solarPotential.solarPanels[0].yearlyEnergyDcKwh;
    solarPanels = solarPotential.solarPanels.map((panel) => {
        const [w, h] = [solarPotential.panelWidthMeters / 2, solarPotential.panelHeightMeters / 2];
        const points = [
            { x: +w, y: +h }, // top right
            { x: +w, y: -h }, // bottom right
            { x: -w, y: -h }, // bottom left
            { x: -w, y: +h }, // top left
            { x: +w, y: +h } //  top right
        ];
        const orientation = panel.orientation == "PORTRAIT" ? 90 : 0;
        const azimuth = solarPotential.roofSegmentStats[panel.segmentIndex].azimuthDegrees;
        const colorIndex = Math.round(normalize(panel.yearlyEnergyDcKwh, maxEnergy, minEnergy) * 255);
        return new google.maps.Polygon({
            paths: points.map(({ x, y }) =>
                geometryLibrary.spherical.computeOffset(
                    { lat: panel.center.latitude, lng: panel.center.longitude },
                    Math.sqrt(x * x + y * y),
                    Math.atan2(y, x) * (180 / Math.PI) + orientation + azimuth
                )
            ),
            strokeColor: "#B0BEC5",
            strokeOpacity: 0.9,
            strokeWeight: 1,
            fillColor: palette[colorIndex],
            fillOpacity: 0.9
        });
    });

    solarPanels.map((panel, i) =>
        panel.setMap(mapSettings.value.showPanels && panelConfig && i < panelConfig.panelsCount ? map : null)
    );
}

/*
    Heatmap layer
*/
let dataLayersResponse: SolarLayers | null;
let layer: Layer | undefined;
let overlays: google.maps.GroundOverlay[] = [];
let showRoofOnly = false;
async function showDataLayer(reset: boolean = false) {
    if (reset) {
        resetDataLayer();
    }

    if (mapSettings.value.layerId == null || buildingInsights.value == null) {
        return;
    }

    if (!layer) {
        const center: LatLng = {
            lat: buildingInsights.value.center.latitude,
            lng: buildingInsights.value.center.longitude
        };
        const ne = buildingInsights.value.boundingBox.ne;
        const sw = buildingInsights.value.boundingBox.sw;
        const diameter = geometryLibrary.spherical.computeDistanceBetween(
            new google.maps.LatLng(ne.latitude, ne.longitude),
            new google.maps.LatLng(sw.latitude, sw.longitude)
        );
        const radius = Math.ceil(diameter / 2);

        try {
            dataLayersResponse = await getSolarLayers(center, radius);
        } catch (error) {
            return;
        }

        try {
            layer = await getSingleLayer(mapSettings.value.layerId, dataLayersResponse as SolarLayers);
        } catch (error) {
            return;
        }
    }

    resetHeatmapLayer();
}

function resetDataLayer() {
    dataLayersResponse = null;
    layer = undefined;

    // Default values per layer.
    showRoofOnly = ["annualFlux", "monthlyFlux", "hourlyShade"].includes(mapSettings.value.layerId);
    map.setMapTypeId("satellite");
}

function resetHeatmapLayer() {
    if (!layer) {
        return;
    }

    const bounds = layer.bounds;
    overlays.map((overlay) => overlay.setMap(null));
    if (!mapSettings.value.showHeatmap) {
        return;
    }

    overlays = layer
        .render(showRoofOnly, timeParams.value.month, timeParams.value.day)
        .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));

    if (layer.id === "monthlyFlux") {
        displayMonthlyFlux();
    } else if (layer.id === "hourlyShade") {
        displayhourlyShade();
    } else {
        overlays[0].setMap(map);
    }
}

function displayMonthlyFlux() {
    if (mapSettings.value.showHeatmap) {
        overlays.map((overlay, i) => overlay.setMap(i == timeParams.value.month ? map : null));
    }
}

function displayhourlyShade() {
    if (mapSettings.value.showHeatmap) {
        overlays.map((overlay, i) => overlay.setMap(i == timeParams.value.hour ? map : null));
    }
}
</script>
