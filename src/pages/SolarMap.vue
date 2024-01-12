<template>
    <div class="d-flex" style="height: 100vh;">
        <v-card id="map-details" :class="$vuetify.display.xs ? 'map-details-mobile' : 'map-details-computer'">
            <v-text-field
                v-model="autocompleteValue"
                id="autocomplete-search"
                :class="$vuetify.display.xs ? 'autocomplete-search-mobile' : 'autocomplete-search-computer'"
                placeholder="Find a location"
                hide-details
                single-line
                variant="solo"
                rounded
            >
                <v-icon slot="prepend-inner-icon" color="theme" class="my-auto mr-3">mdi-google-maps</v-icon>
            </v-text-field>

            <v-divider/>

            <v-card-title class="map-title">
                <v-icon class="mr-2 mb-1">mdi-weather-sunny</v-icon> Solar Analysis
            </v-card-title>

            <v-divider/>
            
            <div class="mb-3 mx-2 pa-2 mt-3">
                <v-btn 
                    @click="solarReadonlyPanel = 0;" 
                    class="w-50 h-100 py-4 universal-font-theme" 
                    :class="solarReadonlyPanel == 0 ? 'button-selection-border' : 'button-non-selection-border'" 
                    :prepend-icon="solarReadonlyPanel == 0 ? 'mdi-home' : 'mdi-home-outline'" 
                    variant="flat"
                    :ripple="false"
                > 
                    Building
                </v-btn>
                <v-btn 
                    @click="solarReadonlyPanel = 1;" 
                    class="w-50 h-100 py-4 universal-font-theme" 
                    :class="solarReadonlyPanel == 1 ? 'button-selection-border' : 'button-non-selection-border'" 
                    :prepend-icon="solarReadonlyPanel == 1 ? 'mdi-transmission-tower' : 'mdi-transmission-tower'" 
                    variant="flat"
                    :ripple="false"
                > 
                    Energy
                </v-btn>
            </div>

            <v-divider/>

            <div :class="$vuetify.display.xs ? 'map-data-mobile' : 'map-data-computer'">
                <v-expansion-panels>
                    <v-expansion-panel class="mb-2" elevation="5">
                        <v-expansion-panel-title>
                            <div class="section-title d-flex">
                            <v-icon class="mr-3" color="theme">mdi-solar-power-variant-outline</v-icon> 
                            <div class="my-auto"> 
                                Panels
                            </div>
                        </div>
                        </v-expansion-panel-title>
                        
                        <v-expansion-panel-text>
                            <div class="detail-text mb-3">
                                Solar panels are ordered from most to least efficient based annual sunlight of the roof (e.g. an input of 10 panels will use the 10 most efficient)
                            </div>

                            <div>
                                <div class="d-flex">
                                    <v-icon class="mr-3" color="theme">mdi-scale-balance</v-icon>
                                    <div class="me-auto subsection-title">
                                        Count
                                    </div>
                                    <div class="text-right">
                                        {{ userSolarData.panelCount }} / {{ userSolarData.maxPanelCount }} panels
                                    </div>
                                </div>
                                <v-slider
                                    v-model="userSolarData.panelCount"
                                    @end="panelCountChange"
                                    :min="userSolarData.minPanelCount" 
                                    :max="userSolarData.maxPanelCount"
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
                                    <template v-slot:append-inner>
                                        Watts
                                    </template>
                                </v-text-field>
                            </div>
                            <div class="w-100 text-center mb-2">
                                <v-chip @click="advancedSettingsPanels.length == 0 ? advancedSettingsPanels=['advanced-settings-panels'] : advancedSettingsPanels=[]" color="theme" variant="text" :append-icon="advancedSettingsPanels.length == 0 ? 'mdi-menu-down' : 'mdi-menu-up'"> Advanced Settings </v-chip>
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
                                            <template v-slot:append-inner>
                                                %
                                            </template>
                                        </v-text-field> 
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>   

                            <div>
                                <v-switch v-model="showPanels" label="Show panels" inset color="theme" density="compact"/>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel elevation="5">
                        <v-expansion-panel-title>
                            <div class="section-title d-flex">
                                <v-icon class="mr-3">mdi-battery-charging-70</v-icon> 
                                <div class="my-auto"> 
                                    Solar Potential
                                </div>
                            </div>
                        </v-expansion-panel-title>
                        
                        <v-expansion-panel-text>
                            <div class="detail-text mb-3">
                                Solar potential is used to evaluate the financial benefits of solar panels for a specific building
                            </div>

                            <div>
                                <div class="d-flex mb-2">
                                    <v-icon class="mr-3" color="theme">mdi-cash</v-icon>
                                    <div class="my-auto me-auto subsection-title">
                                        Costs and Incentives
                                    </div>
                                </div>
                                <v-text-field
                                    v-model="userSolarData.averageMonthlyEnergyBill"
                                    label="Average monthly energy cost"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    type="number"
                                    prepend-inner-icon="mdi-calendar-month-outline"
                                >
                                    <template v-slot:append-inner>
                                        $
                                    </template>
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
                                    <template v-slot:append-inner>
                                        $
                                    </template>
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
                                    <template v-slot:append-inner>
                                        $
                                    </template>
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
                                    <template v-slot:append-inner>
                                        $
                                    </template>
                                </v-text-field> 
                            </div>

                            <div class="w-100 text-center mb-2">
                                <v-chip @click="advancedSettingsSolarPotential.length == 0 ? advancedSettingsSolarPotential=['advanced-settings-solar-potential'] : advancedSettingsSolarPotential=[]" color="theme" variant="text" :append-icon="advancedSettingsSolarPotential.length == 0 ? 'mdi-menu-down' : 'mdi-menu-up'"> Advanced Settings </v-chip>
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
                                            <template v-slot:append-inner>
                                                %
                                            </template>
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
                                            <template v-slot:append-inner>
                                                %
                                            </template>
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
                                            <template v-slot:append-inner>
                                                %
                                            </template>
                                        </v-text-field> 
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>   
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </v-card>

        <div id="map" class="w-100">
        </div>
        
        <div v-if="Object.keys(buildingInsights).length">
            <BuildingReadonlyPanel v-if="solarReadonlyPanel == 0" :buildingInsights="buildingInsights" :userSolarData="userSolarData"/>
            <EnergyReadonlyPanel v-if="solarReadonlyPanel == 1" :buildingInsights="buildingInsights" :userSolarData="userSolarData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref, watch } from 'vue';
// Util
import { BuildingInsights, LayerId, SolarLayers, Layer, SolarPanelConfig, UserSolarData } from '@/util/solarTypes';
import { panelsPalette } from "@/util/constants"
import { RequestError, Coordinates } from '@/util/generalTypes';
import { createPalette, rgbToColor, colorToRGB, lerp, normalize, clamp } from "@/util/generalFunctions";
import { getSolarDataLayers, getSingleLayer, findClosestBuilding, getReverseGeocoding, getGeocoding } from "@/api/googleMapsAPI";
import { initMap, initAutocomplete } from "@/util/generalFunctions";
// Components
import BuildingReadonlyPanel from "@/components/solar/BuildingReadonlyPanel.vue";
import EnergyReadonlyPanel from "@/components/solar/EnergyReadonlyPanel.vue";

// Emit
const emit = defineEmits(['alert']);
function emitAlert(type: string, title: string, message: string) {
    emit('alert', {
        type: type, 
        title: title, 
        message: message
    });
}

// Components data
const solarReadonlyPanel = ref(0);
const showPanels = ref(true);
const configId = ref(0);
const autocompleteValue = ref("");
const advancedSettingsPanels = ref([] as string[]);
const advancedSettingsSolarPotential = ref([] as string[]);
const userSolarData = ref<UserSolarData>({
    panelCount: 0,
    minPanelCount: 0,
    maxPanelCount: 1,
    panelCapacityWatts: 350,
    defaultPanelCapacityWatts: 350,
    installationCostPerWatt: 4.00,
    yearlyEnergyDcKwh: 0,
    dcToAcDerate: 85,
    averageMonthlyEnergyBill: 300,
    energyCostPerKwh: 0.31,
    solarIncentives: 5000,
    yearlyPanelEfficiencyDecline: 0.5,
    yearlyEnergyCostIncrease: 2.2,
    yearlyDiscountRate: 4
});

// Google components
let map: google.maps.Map;
let autocomplete: google.maps.places.Autocomplete;
const buildingInsights = ref<BuildingInsights>({} as BuildingInsights);
let geometryLibrary: google.maps.GeometryLibrary;

onMounted(async () => {
    const coord: Coordinates = { lat: 46.81701, lng: -71.36838 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    
    // Init values of google components
    map = await initMap(coord, mapElement, "SOLAR");
    autocomplete = await initAutocomplete("autocomplete-search");
    autocompleteValue.value = await getReverseGeocoding(coord);
    if (map == undefined || autocomplete == undefined) {
        emitAlert(
            "error", 
            "Could not properly load the map",
            "An error occured when trying to load the map and its components."
        );
    }

    await initListeners(autocomplete, map);
    await updateBuildingInsights(coord);
    geometryLibrary = await google.maps.importLibrary("geometry") as google.maps.GeometryLibrary
    showDataLayer(true);
    showSolarPotential();
})

watch(showPanels, async () => {
    await showSolarPotential(configId.value);
});

async function initListeners(autocomplete: google.maps.places.Autocomplete, map: google.maps.Map) {
    autocomplete.addListener("place_changed", async () => {
        const newPlace: google.maps.places.PlaceResult = autocomplete.getPlace();
        if ( !newPlace || !newPlace.formatted_address ) {
            emitAlert(
                "warning", 
                "Could not process the prompted address",
                "Choose a valid address from the dropdown menu."
            );
            return;
        }

        const newCoord: Coordinates | undefined = await getGeocoding(newPlace.formatted_address);
        if ( !newCoord ) {
            autocompleteValue.value = "";
            emitAlert(
                "error", 
                "Could not geocode the prompted address",
                "An error occured when trying to convert the address to geographic Coordinates."
            );
            return;
        }
        
        map.setCenter({ lat: newCoord.lat, lng: newCoord.lng });
        buildingInsights.value = await findClosestBuilding(newCoord);
        showDataLayer(true);
    });
}

async function updateBuildingInsights(coord: Coordinates) {
    buildingInsights.value = await findClosestBuilding(coord);
    userSolarData.value.minPanelCount = buildingInsights.value.solarPotential.solarPanelConfigs[0].panelsCount;
    userSolarData.value.maxPanelCount = buildingInsights.value.solarPotential.solarPanelConfigs[buildingInsights.value.solarPotential.solarPanelConfigs.length - 1].panelsCount;
    userSolarData.value.defaultPanelCapacityWatts = buildingInsights.value.solarPotential.panelCapacityWatts;

    if (userSolarData.value.panelCount < userSolarData.value.minPanelCount) userSolarData.value.panelCount = userSolarData.value.minPanelCount;
}

async function panelCountChange() {
    // Because the list of configs has the minPanelCount for its first index
    configId.value = userSolarData.value.panelCount - userSolarData.value.minPanelCount;
    await showSolarPotential(configId.value);
}


let panelConfig: SolarPanelConfig | undefined;
let solarPanels: google.maps.Polygon[] = [];
async function showSolarPotential(configId: number = 0) {
    if (buildingInsights.value == null) {
        return;
    }
    // console.log('showSolarPotential');
    solarPanels.map((panel) => panel.setMap(null));
    solarPanels = [];
    panelConfig = buildingInsights.value.solarPotential.solarPanelConfigs[configId];
    userSolarData.value.yearlyEnergyDcKwh = panelConfig.yearlyEnergyDcKwh;

    // Create the solar panels on the map.
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
            { x: +w, y: +h }, //  top right
        ];
        const orientation = panel.orientation == 'PORTRAIT' ? 90 : 0;
        const azimuth = solarPotential.roofSegmentStats[panel.segmentIndex].azimuthDegrees;
        const colorIndex = Math.round(normalize(panel.yearlyEnergyDcKwh, maxEnergy, minEnergy) * 255);
        return new google.maps.Polygon({
            paths: points.map(({ x, y }) =>
                geometryLibrary.spherical.computeOffset(
                    { lat: panel.center.latitude, lng: panel.center.longitude },
                    Math.sqrt(x * x + y * y),
                    Math.atan2(y, x) * (180 / Math.PI) + orientation + azimuth,
                ),
            ),
            strokeColor: '#B0BEC5',
            strokeOpacity: 0.9,
            strokeWeight: 1,
            fillColor: palette[colorIndex],
            fillOpacity: 0.9,
        });
    });

    solarPanels.map((panel, i) =>
        panel.setMap(showPanels.value && panelConfig && i < panelConfig.panelsCount ? map : null)
    );
}


const icon = 'layers';
const title = 'Data Layers endpoint';
const dataLayerOptions: Record<LayerId | 'none', string> = {
    none: 'No layer',
    mask: 'Roof mask',
    dsm: 'Digital Surface Model',
    rgb: 'Aerial image',
    annualFlux: 'Annual sunshine',
    monthlyFlux: 'Monthly sunshine',
    hourlyShade: 'Hourly shade',
};

const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

let dataLayersResponse: SolarLayers | undefined;
let requestError: RequestError | undefined;
let layerId: LayerId | 'none' = 'annualFlux';
let layer: Layer | undefined;

let playAnimation = true;
let tick = 0;
let month = 0;
let day = 14;
let hour = 0;

let overlays: google.maps.GroundOverlay[] = [];
let showRoofOnly = false;

async function showDataLayer(reset: boolean = false) {
    if (reset) {
        dataLayersResponse = undefined;
        requestError = undefined;
        layer = undefined;

        // Default values per layer.
        showRoofOnly = ['annualFlux', 'monthlyFlux', 'hourlyShade'].includes(layerId);
        map.setMapTypeId(layerId == 'rgb' ? 'roadmap' : 'satellite');
        overlays.map((overlay) => overlay.setMap(null));
        month = layerId == 'hourlyShade' ? 3 : 0;
        day = 14;
        hour = 5;
        playAnimation = ['monthlyFlux', 'hourlyShade'].includes(layerId);
    }

    if (layerId == 'none' || buildingInsights.value == null) {
        return;
    }

    if (!layer) {
        const center = buildingInsights.value.center;
        const ne = buildingInsights.value.boundingBox.ne;
        const sw = buildingInsights.value.boundingBox.sw;
        const diameter = geometryLibrary.spherical.computeDistanceBetween(
            new google.maps.LatLng(ne.latitude, ne.longitude),
            new google.maps.LatLng(sw.latitude, sw.longitude),
        );
        const radius = Math.ceil(diameter / 2);
        try {
            dataLayersResponse = await getSolarDataLayers(center, radius);
        } catch (e) {
            requestError = e as RequestError;
            return;
        }

        try {
            layer = await getSingleLayer(layerId, dataLayersResponse as SolarLayers);
        } catch (e) {
            requestError = e as RequestError;
            return;
        }

        if (!layer) return;
    }

    const bounds = layer.bounds;
    // console.log('Render layer:', {
    //     layerId: layer.id,
    //     showRoofOnly: showRoofOnly,
    //     month: month,
    //     day: day,
    // });
    overlays.map((overlay) => overlay.setMap(null));
    overlays = layer
        .render(showRoofOnly, month, day)
        .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));

    overlays[0].setMap(map);
}
</script>