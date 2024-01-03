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
                
            <div :class="$vuetify.display.xs ? 'map-data-mobile' : 'map-data-computer'">
                <div class="mb-4">
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

                <v-expansion-panels multiple>
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
                                        {{ panelCount }} / {{ maxNbOfPanels }} panels
                                    </div>
                                </div>
                                <v-slider 
                                    v-model="panelCount" 
                                    :min="minNbOfPanels" 
                                    :max="maxNbOfPanels"
                                    step="1"
                                    color="theme"
                                />
                            </div>
                            
                            <div>
                                <div class="d-flex">
                                    <v-icon class="mr-3" color="theme">mdi-lightning-bolt</v-icon>
                                    <div class="my-auto me-auto subsection-title">
                                        Power Rating (capacity)
                                    </div>
                                </div>
                                <v-text-field
                                    v-model="panelPowerRating"
                                    placeholder="Power rating"
                                    density="compact"
                                    variant="outlined"
                                    color="theme"
                                    type="number"
                                >
                                    <template v-slot:append-inner>
                                        Watts
                                    </template>
                                </v-text-field>
                            </div>

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
                                    v-model="monthlyEnergyCost"
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
                                    v-model="costPerKwh"
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
                                    v-model="installationPerKwh"
                                    label="Installation cost per kWh"
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
                                    v-model="solarIncentives"
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
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </v-card>

        <div id="map" class="w-100"></div>
    </div>

    <div v-if="Object.keys(buildingInsights).length">
        <BuildingReadonlyPanel v-if="solarReadonlyPanel == 0" :buildingInsights="buildingInsights" :panelCount="panelCount" :maxNbOfPanels="maxNbOfPanels"/>
        <EnergyReadonlyPanel v-if="solarReadonlyPanel == 1" :buildingInsights="buildingInsights" :panelCount="Number(panelCount)" :maxNbOfPanels="Number(maxNbOfPanels)" :yearlyEnergy="Number(yearlyEnergy)" :monthlyEnergyCost="Number(monthlyEnergyCost)" :installationPerKwh="Number(installationPerKwh)" :panelPowerRating="Number(panelPowerRating)"/>
    </div>
</template>

<script setup lang="ts">
// Vue
import { onMounted, ref } from 'vue';
// Models
import { BuildingInsights, LayerId, SolarLayers, RequestError, Layer, Coordinates, panelsPalette, SolarPanelConfig } from '@/models/models';
// API
import { getSolarDataLayers, getSingleLayer, findClosestBuilding, getReverseGeocoding, getGeocoding } from "@/util/googleMapsAPI";
// Functions
import { initMap, initAutocomplete } from "@/util/initMapComponents";
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
const autocompleteValue = ref("");

// Google components
let map: google.maps.Map;
let autocomplete: google.maps.places.Autocomplete;
let expandedSection: string;
const buildingInsights = ref<BuildingInsights>({} as BuildingInsights);
let geometryLibrary: google.maps.GeometryLibrary;


onMounted(async () => {
    const coord: Coordinates = { lat: 46.81701, lng: -71.36838 };
    const mapElement: HTMLElement = document.getElementById("map") as HTMLElement;
    const parent: HTMLInputElement = document.getElementById("parent-search") as HTMLInputElement;
    
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

    buildingInsights.value = await findClosestBuilding(coord);
    geometryLibrary = await google.maps.importLibrary("geometry") as google.maps.GeometryLibrary
    showDataLayer(true);
    showSolarPotential();
    console.log(buildingInsights);
})

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

async function showDataLayer(reset = false) {
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
    }

    const bounds = layer.bounds;
    console.log('Render layer:', {
        layerId: layer.id,
        showRoofOnly: showRoofOnly,
        month: month,
        day: day,
    });
    overlays.map((overlay) => overlay.setMap(null));
    overlays = layer
        .render(showRoofOnly, month, day)
        .map((canvas) => new google.maps.GroundOverlay(canvas.toDataURL(), bounds));

    overlays[0].setMap(map);
}


let panelConfig: SolarPanelConfig | undefined;

let solarPanels: google.maps.Polygon[] = [];

const panelCount = ref(0);
const minNbOfPanels = ref(0);
const maxNbOfPanels = ref(1);
const showPanels = ref(true);
const panelPowerRating = ref(350);

const yearlyEnergy = ref(0);
const monthlyEnergyCost = ref(0);
const costPerKwh = ref(0);
const installationPerKwh = ref(0);
const solarIncentives = ref(0);

let configId: number | undefined; // linked to buildingInsights.solarPotential.solarPanelConfigs: 1st is min nb of panels, last is max nb of panels


async function showSolarPotential() {
    if (buildingInsights.value == null) {
        return;
    }
    console.log('showSolarPotential');
    solarPanels.map((panel) => panel.setMap(null));
    solarPanels = [];

    configId = 0;
    minNbOfPanels.value = buildingInsights.value.solarPotential.solarPanelConfigs[0].panelsCount;
    maxNbOfPanels.value = buildingInsights.value.solarPotential.solarPanelConfigs[buildingInsights.value.solarPotential.solarPanelConfigs.length - 1].panelsCount;
    panelConfig = buildingInsights.value.solarPotential.solarPanelConfigs[configId];
    yearlyEnergy.value = panelConfig.yearlyEnergyDcKwh;

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

function createPalette(hexColors: string[], size = 256) {
	const rgb = hexColors.map(colorToRGB);
	const step = (rgb.length - 1) / (size - 1);
	return Array(size)
		.fill(0)
		.map((_, i) => {
			const index = i * step;
			const j = Math.floor(index);
			const k = Math.ceil(index);
			return {
				r: lerp(rgb[j].r, rgb[k].r, index - j),
				g: lerp(rgb[j].g, rgb[k].g, index - j),
				b: lerp(rgb[j].b, rgb[k].b, index - j),
			};
		});
}

function colorToRGB(color: string): { r: number; g: number; b: number } {
	const hex = color.startsWith('#') ? color.slice(1) : color;
	return {
		r: parseInt(hex.substring(0, 2), 16),
		g: parseInt(hex.substring(2, 4), 16),
		b: parseInt(hex.substring(4, 6), 16),
	};
}

function rgbToColor({ r, g, b }: { r: number; g: number; b: number }): string {
	const f = (x: number) => {
		const hex = Math.round(x).toString(16);
		return hex.length == 1 ? `0${hex}` : hex;
	};
	return `#${f(r)}${f(g)}${f(b)}`;
}

function lerp(x: number, y: number, t: number) {
	return x + t * (y - x);
}

function normalize(x: number, max: number = 1, min: number = 0) {
	const y = (x - min) / (max - min);
	return clamp(y, 0, 1);
}

function clamp(x: number, min: number, max: number) {
	return Math.min(Math.max(x, min), max);
}
</script>