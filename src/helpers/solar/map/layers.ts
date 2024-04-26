import { getSolarLayers } from "@/api/solar";
import { LatLng } from "geo-env-typing/geo";
import { BuildingInsights, MapSettings, SolarLayers } from "geo-env-typing/solar";
import { getSingleLayer } from "@/helpers/solar/map/geotiffs";

export async function getLayerFromBuildingInsights(buildingInsights: BuildingInsights, mapSettings: MapSettings) {
    const geometryLibrary: google.maps.GeometryLibrary = (await google.maps.importLibrary(
        "geometry"
    )) as google.maps.GeometryLibrary;

    const center: LatLng = {
        lat: buildingInsights.center.latitude,
        lng: buildingInsights.center.longitude
    };

    const ne = buildingInsights.boundingBox.ne;
    const sw = buildingInsights.boundingBox.sw;
    const diameter = geometryLibrary.spherical.computeDistanceBetween(
        new google.maps.LatLng(ne.latitude, ne.longitude),
        new google.maps.LatLng(sw.latitude, sw.longitude)
    );
    const radius = Math.ceil(diameter / 2);

    const solarLayers: SolarLayers | null = await getSolarLayers(center, radius);

    return await getSingleLayer(mapSettings.layerId, solarLayers as SolarLayers);
}
