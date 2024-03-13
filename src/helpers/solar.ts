import { LayerId, SolarLayers, Layer, GeoTiff, MapSettings, SolarDataType } from "geo-env-typing/solar";
import { TimeParameters, UserSolarData } from "@/helpers/types";
import { GoogleCharts } from "google-charts";
import ApexCharts from 'apexcharts'
import {
    lerp,
    normalize,
    yearlyUtilityBillEstimates,
    installationCostCalc,
    yearlyCostWithoutSolar
} from "@/helpers/solarMath";
import { getGeotiff } from "@/server/solar";
import { ironPalette, sunlightPalette } from "@/helpers/constants";

export function colorToRGB(color: string): { r: number; g: number; b: number } {
    const hex = color.startsWith("#") ? color.slice(1) : color;
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

export function rgbToColor({ r, g, b }: { r: number; g: number; b: number }): string {
    const f = (x: number) => {
        const hex = Math.round(x).toString(16);
        return hex.length == 1 ? `0${hex}` : hex;
    };
    return `#${f(r)}${f(g)}${f(b)}`;
}

export function createPalette(hexColors: string[], size = 256) {
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
                b: lerp(rgb[j].b, rgb[k].b, index - j)
            };
        });
}

export function drawGoogleChart(userSolarData: UserSolarData, costChart: HTMLElement | null) {
    GoogleCharts.load(
        () => {
            if (!costChart) return;

            const year = new Date().getFullYear();

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

            const data = google.visualization.arrayToDataTable([
                ["Year", "Solar", "No solar"],
                [year.toString(), 0, 0],
                ...cumulativeCostWithSolar.map((_, i) => [
                    (year + i + 1).toString(),
                    cumulativeCostWithSolar[i],
                    cumulativeCostWithoutSolar[i]
                ])
            ]);

            const googleCharts = google.charts as any;
            const chart = new googleCharts.Line(costChart);
            const options = googleCharts.Line.convertOptions({});
            chart.draw(data, options);
        },
        { packages: ["line"] }
    );
}

export async function drawSolarInsightsChart(userSolarData: UserSolarData, costChart: HTMLElement) {
    const year = new Date().getFullYear();
    const yearsList = [];
    for (let i = year; i < year + userSolarData.installationLifespan; i++) {
        yearsList.push(i);
    }

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

    console.log(cumulativeCostWithSolar)
    console.log(cumulativeCostWithoutSolar)
    console.log(yearsList)

    const options = {
        chart: {
          type: 'line'
        },
        series: [
            {
                name: 'sales',
                data: [30,40,35,50,49,60,70,91,125]
            }
        ],
        xaxis: {
          categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
        }
      }
      
      new ApexCharts(costChart, options).render();
}

export async function getSingleLayer(layerId: LayerId, urls: SolarLayers) {
    const get: Record<LayerId, () => Promise<Layer>> = {
        annualFlux: async () => {
            const [mask, data] = await Promise.all([
                await getGeotiff(urls.maskUrl),
                await getGeotiff(urls.annualFluxUrl)
            ]);

            const colors = ironPalette;
            return {
                id: layerId,
                bounds: mask.bounds,
                palette: {
                    colors: colors,
                    min: "Shady",
                    max: "Sunny"
                },
                render: (showRoofOnly) => [
                    renderPalette({
                        data: data,
                        mask: showRoofOnly ? mask : undefined,
                        colors: colors,
                        min: 0,
                        max: 1800
                    })
                ]
            };
        },
        monthlyFlux: async () => {
            const [mask, data] = await Promise.all([
                await getGeotiff(urls.maskUrl),
                await getGeotiff(urls.monthlyFluxUrl)
            ]);
            const colors = ironPalette;

            return {
                id: layerId,
                bounds: mask.bounds,
                palette: {
                    colors: colors,
                    min: "Shady",
                    max: "Sunny"
                },
                render: (showRoofOnly) =>
                    [...Array(12).keys()].map((month) =>
                        renderPalette({
                            data: data,
                            mask: showRoofOnly ? mask : undefined,
                            colors: colors,
                            min: 0,
                            max: 200,
                            index: month
                        })
                    )
            };
        },
        hourlyShade: async () => {
            const [mask, ...months] = await Promise.all([
                await getGeotiff(urls.maskUrl),
                ...urls.hourlyShadeUrls.map(async (url) => await getGeotiff(url))
            ]);

            const colors = sunlightPalette;
            return {
                id: layerId,
                bounds: mask.bounds,
                palette: {
                    colors: colors,
                    min: "Shade",
                    max: "Sun"
                },
                render: (showRoofOnly, month, day) =>
                    [...Array(24).keys()].map((hour) =>
                        renderPalette({
                            data: {
                                ...months[month],
                                rasters: months[month].rasters.map((values) => values.map((x) => x & (1 << (day - 1))))
                            },
                            mask: showRoofOnly ? mask : undefined,
                            colors: colors,
                            min: 0,
                            max: 1,
                            index: hour
                        })
                    )
            };
        },
        mask: function (): Promise<Layer> {
            throw new Error("Function not implemented.");
        },
        dsm: function (): Promise<Layer> {
            throw new Error("Function not implemented.");
        },
        rgb: function (): Promise<Layer> {
            throw new Error("Function not implemented.");
        }
    };
    try {
        return get[layerId]();
    } catch (e) {
        console.error(`Error getting layer: ${layerId}\n`, e);
        throw e;
    }
}

export function renderRGB(rgb: GeoTiff, mask?: GeoTiff) {
    // https://www.w3schools.com/tags/canvas_createimagedata.asp
    const canvas = document.createElement("canvas");
    canvas.width = mask ? mask.width : rgb.width;
    canvas.height = mask ? mask.height : rgb.height;

    const dw = rgb.width / canvas.width;
    const dh = rgb.height / canvas.height;

    const ctx = canvas.getContext("2d")!;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const imgIdx = y * canvas.width * 4 + x * 4;
            const rgbIdx = Math.floor(y * dh) * rgb.width + Math.floor(x * dw);
            const maskIdx = y * canvas.width + x;
            img.data[imgIdx + 0] = rgb.rasters[0][rgbIdx]; // Red
            img.data[imgIdx + 1] = rgb.rasters[1][rgbIdx]; // Green
            img.data[imgIdx + 2] = rgb.rasters[2][rgbIdx]; // Blue
            img.data[imgIdx + 3] = mask // Alpha
                ? mask.rasters[0][maskIdx] * 255
                : 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    return canvas;
}

export function renderPalette({
    data,
    mask,
    colors,
    min,
    max,
    index
}: {
    data: GeoTiff;
    mask?: GeoTiff;
    colors?: string[];
    min?: number;
    max?: number;
    index?: number;
}) {
    const n = 256;
    const palette = createPalette(colors ?? ["000000", "ffffff"], n);
    const indices = data.rasters[index ?? 0]
        .map((x) => normalize(x, max ?? 1, min ?? 0))
        .map((x) => Math.round(x * (n - 1)));
    return renderRGB(
        {
            ...data,
            rasters: [
                indices.map((i: number) => palette[i].r),
                indices.map((i: number) => palette[i].g),
                indices.map((i: number) => palette[i].b)
            ]
        },
        mask
    );
}

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
