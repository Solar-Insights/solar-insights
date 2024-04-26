import { LayerId, SolarLayers, Layer } from "geo-env-typing/solar";
import { getGeotiff } from "@/api/solar";
import { ironPalette, sunlightPalette } from "@/helpers/constants";
import { renderPalette } from "@/helpers/solar/ui/colorPalettes";

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
