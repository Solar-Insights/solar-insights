// Util
import { Coordinates, validCoordinates } from "@/util/generalTypes";
import { AirQualityData, AirPollutant } from "@/util/airQualityTypes";
import { BuildingInsights, SolarDataCoords, SolarLayers, LayerId, Layer, Bounds, binaryPalette, GeoTiff, rainbowPalette, ironPalette, sunlightPalette } from "@/util/solarTypes";
import * as geotiff from 'geotiff';
import * as geokeysToProj4 from 'geotiff-geokeys-to-proj4';
import proj4 from 'proj4';

export async function getGeocoding(formattedAddress: string) {
    const geocoder = new google.maps.Geocoder()
    const coord: Coordinates = {
        lat: 0,
        lng: 0
    };
    await geocoder.geocode({ address: formattedAddress})
        .then((geocodingRequest: google.maps.GeocoderResponse) => {
            coord.lat = geocodingRequest.results[0].geometry.location.lat();
            coord.lng = geocodingRequest.results[0].geometry.location.lng();
        })
        .catch((error) => {
            console.log(error);
        })
    
    if ( validCoordinates(coord) && coord.lat != 0 && coord.lng != 0 ) {
        return coord;
    }
}


export async function getReverseGeocoding(coord: Coordinates) {
    const geocoder = new google.maps.Geocoder();
    let formattedAddress = "";
    await geocoder.geocode({ location: coord})
    .then((geocodingRequest: google.maps.GeocoderResponse) => {
        formattedAddress = geocodingRequest.results[0].formatted_address;
    })
    .catch((error) => {
        console.log(error);
    })
    return formattedAddress;
}


export async function getAirQualityData(coord: Coordinates) {
    // https://developers.google.com/maps/documentation/air-quality/reference/rest/v1/currentConditions/lookup#request-body
    let airQualityData: AirQualityData | undefined = {} as AirQualityData;
    const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${import.meta.env.VITE_GOOGLE_API}`;
    const body = {
        "universalAqi": true,
        "location": {
            "latitude": coord.lat,
            "longitude": coord.lng
        },
        "extraComputations": [
            "DOMINANT_POLLUTANT_CONCENTRATION",
            "POLLUTANT_CONCENTRATION",
            "POLLUTANT_ADDITIONAL_INFO",
            "HEALTH_RECOMMENDATIONS"
        ]
    };

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    })
    .then(async (response) => {
        airQualityData = await response.json() as AirQualityData;
        if (airQualityData == undefined) {
            return {};
        }
        makeDominantPollutantFirst(airQualityData.indexes[0].dominantPollutant, airQualityData.pollutants);
    })
    .catch((error) => {
        console.log("an error has occured when fetching the air quality data");
    })
    return airQualityData;
}

function makeDominantPollutantFirst(dominantPollutant: string, listOfPollutants: AirPollutant[]) {
    const index = listOfPollutants.findIndex(pollutant => pollutant.code == dominantPollutant);
    if (index != -1) {
        listOfPollutants.sort((a, b) => {
            if (a.code == dominantPollutant) return -1;
            if (b.code == dominantPollutant) return -1;
            return a.code.localeCompare(b.code);
        });
    }
}

export function getSolarDataLayers(coord: SolarDataCoords, radius: number) {
    const args = {
		'location.latitude': coord.latitude.toFixed(5),
		'location.longitude': coord.longitude.toFixed(5),
		'radiusMeters': radius.toString(),
		'view': "FULL_LAYERS",
		'requiredQuality': "HIGH",
	};
    console.log('GET dataLayers\n', args);
	const params = new URLSearchParams({ ...args, key: import.meta.env.VITE_GOOGLE_API})
    return fetch(`https://solar.googleapis.com/v1/dataLayers:get?${params}`)
        .then(async (response) => {
            const content = response.json();
            if ( response.status == 200 ) {
                return content as Promise<SolarLayers>;
            }
        })
};

export async function getSingleLayer(layerId: LayerId, urls: SolarLayers) {
	const get: Record<LayerId, () => Promise<Layer>> = {
		mask: async () => {
			const mask = await downloadGeoTIFF(urls.maskUrl);
			const colors = binaryPalette;
			return {
				id: layerId,
				bounds: mask.bounds,
				palette: {
					colors: colors,
					min: 'No roof',
					max: 'Roof',
				},
				render: (showRoofOnly) => [
					renderPalette({
						data: mask,
						mask: showRoofOnly ? mask : undefined,
						colors: colors,
					}),
				],
			};
		},
		dsm: async () => {
			const [mask, data] = await Promise.all([
				downloadGeoTIFF(urls.maskUrl),
				downloadGeoTIFF(urls.dsmUrl),
			]);
			const sortedValues = Array.from(data.rasters[0]).sort((x, y) => x - y);
			const minValue = sortedValues[0];
			const maxValue = sortedValues.slice(-1)[0];
			const colors = rainbowPalette;
			return {
				id: layerId,
				bounds: mask.bounds,
				palette: {
					colors: colors,
					min: `${minValue.toFixed(1)} m`,
					max: `${maxValue.toFixed(1)} m`,
				},
				render: (showRoofOnly) => [
					renderPalette({
						data: data,
						mask: showRoofOnly ? mask : undefined,
						colors: colors,
						min: sortedValues[0],
						max: sortedValues.slice(-1)[0],
					}),
				],
			};
		},
		rgb: async () => {
			const [mask, data] = await Promise.all([
				downloadGeoTIFF(urls.maskUrl),
				downloadGeoTIFF(urls.rgbUrl),
			]);
			return {
				id: layerId,
				bounds: mask.bounds,
				render: (showRoofOnly) => [renderRGB(data, showRoofOnly ? mask : undefined)],
			};
		},
		annualFlux: async () => {
			const [mask, data] = await Promise.all([
				downloadGeoTIFF(urls.maskUrl),
				downloadGeoTIFF(urls.annualFluxUrl),
			]);
			const colors = ironPalette;
			return {
				id: layerId,
				bounds: mask.bounds,
				palette: {
					colors: colors,
					min: 'Shady',
					max: 'Sunny',
				},
				render: (showRoofOnly) => [
					renderPalette({
						data: data,
						mask: showRoofOnly ? mask : undefined,
						colors: colors,
						min: 0,
						max: 1800,
					}),
				],
			};
		},
		monthlyFlux: async () => {
			const [mask, data] = await Promise.all([
				downloadGeoTIFF(urls.maskUrl),
				downloadGeoTIFF(urls.monthlyFluxUrl),
			]);
			const colors = ironPalette;
			return {
				id: layerId,
				bounds: mask.bounds,
				palette: {
					colors: colors,
					min: 'Shady',
					max: 'Sunny',
				},
				render: (showRoofOnly) =>
					[...Array(12).keys()].map((month) =>
						renderPalette({
							data: data,
							mask: showRoofOnly ? mask : undefined,
							colors: colors,
							min: 0,
							max: 200,
							index: month,
						}),
					),
			};
		},
		hourlyShade: async () => {
			const [mask, ...months] = await Promise.all([
				downloadGeoTIFF(urls.maskUrl),
				...urls.hourlyShadeUrls.map((url) => downloadGeoTIFF(url)),
			]);
			const colors = sunlightPalette;
			return {
				id: layerId,
				bounds: mask.bounds,
				palette: {
					colors: colors,
					min: 'Shade',
					max: 'Sun',
				},
				render: (showRoofOnly, month, day) =>
					[...Array(24).keys()].map((hour) =>
						renderPalette({
							data: {
								...months[month],
								rasters: months[month].rasters.map((values) =>
									values.map((x) => x & (1 << (day - 1))),
								),
							},
							mask: showRoofOnly ? mask : undefined,
							colors: colors,
							min: 0,
							max: 1,
							index: hour,
						}),
					),
			};
		},
	};
	try {
		return get[layerId]();
	} catch (e) {
		console.error(`Error getting layer: ${layerId}\n`, e);
		throw e;
	}
}

export async function downloadGeoTIFF(url: string): Promise<GeoTiff> {
	console.log(`Downloading data layer: ${url}`);
	const solarUrl = url + `&key=${import.meta.env.VITE_GOOGLE_API}`;
	const response = await fetch(solarUrl);
	if (response.status != 200) {
		const error = await response.json();
		console.error(`downloadGeoTIFF failed: ${url}\n`, error);
		throw error;
	}
	const arrayBuffer = await response.arrayBuffer();
	const tiff = await geotiff.fromArrayBuffer(arrayBuffer);
	const image = await tiff.getImage();
	const rasters = await image.readRasters();

	// Reproject the bounding box into coordinates.
	const geoKeys = image.getGeoKeys();
	const projObj = geokeysToProj4.toProj4(geoKeys);
	const projection = proj4(projObj.proj4, 'WGS84');
	const box = image.getBoundingBox();
	const sw = projection.forward({
		x: box[0] * projObj.coordinatesConversionParameters.x,
		y: box[1] * projObj.coordinatesConversionParameters.y,
	});
	const ne = projection.forward({
		x: box[2] * projObj.coordinatesConversionParameters.x,
		y: box[3] * projObj.coordinatesConversionParameters.y,
	});

	return {
		width: rasters.width,
		height: rasters.height,
		rasters: [...Array(rasters.length).keys()].map((i) =>
			Array.from(rasters[i] as geotiff.TypedArray),
		),
		bounds: {
			north: ne.y,
			south: sw.y,
			east: ne.x,
			west: sw.x,
		},
	};
}

export function renderRGB(rgb: GeoTiff, mask?: GeoTiff) {
	// https://www.w3schools.com/tags/canvas_createimagedata.asp
	const canvas = document.createElement('canvas');
	canvas.width = mask ? mask.width : rgb.width;
	canvas.height = mask ? mask.height : rgb.height;

	const dw = rgb.width / canvas.width;
	const dh = rgb.height / canvas.height;

	const ctx = canvas.getContext('2d')!;
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
	index,
}: {
	data: GeoTiff;
	mask?: GeoTiff;
	colors?: string[];
	min?: number;
	max?: number;
	index?: number;
}) {
	const n = 256;
	const palette = createPalette(colors ?? ['000000', 'ffffff'], n);
	const indices = data.rasters[index ?? 0]
		.map((x) => normalize(x, max ?? 1, min ?? 0))
		.map((x) => Math.round(x * (n - 1)));
	return renderRGB(
		{
			...data,
			rasters: [
				indices.map((i: number) => palette[i].r),
				indices.map((i: number) => palette[i].g),
				indices.map((i: number) => palette[i].b),
			],
		},
		mask,
	);
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
				b: lerp(rgb[j].b, rgb[k].b, index - j),
			};
		});
}

export function colorToRGB(color: string): { r: number; g: number; b: number } {
	const hex = color.startsWith('#') ? color.slice(1) : color;
	return {
		r: parseInt(hex.substring(0, 2), 16),
		g: parseInt(hex.substring(2, 4), 16),
		b: parseInt(hex.substring(4, 6), 16),
	};
}

export function rgbToColor({ r, g, b }: { r: number; g: number; b: number }): string {
	const f = (x: number) => {
		const hex = Math.round(x).toString(16);
		return hex.length == 1 ? `0${hex}` : hex;
	};
	return `#${f(r)}${f(g)}${f(b)}`;
}

export function normalize(x: number, max: number = 1, min: number = 0) {
	const y = (x - min) / (max - min);
	return clamp(y, 0, 1);
}

export function lerp(x: number, y: number, t: number) {
	return x + t * (y - x);
}

export function clamp(x: number, min: number, max: number) {
	return Math.min(Math.max(x, min), max);
}

export async function findClosestBuilding(coord: Coordinates){
	const args = {
		'location.latitude': coord.lat.toFixed(5),
		'location.longitude': coord.lng.toFixed(5),
	};
	console.log('GET buildingInsights\n', args);
	const params = new URLSearchParams({ ...args, key: import.meta.env.VITE_GOOGLE_API });
	return fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?${params}`).then(
		async (response) => {
			const content = await response.json();
			if (response.status != 200) {
				console.error('findClosestBuilding\n', content);
				throw content;
			}
			console.log('buildingInsightsResponse', content);
			return content;
		},
	);
}