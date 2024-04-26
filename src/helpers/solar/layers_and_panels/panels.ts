import { normalize } from "@/helpers/solar/math_and_data/solarDataMath";
import { panelsPalette } from "@/helpers/constants";
import { rgbToColor, createPalette } from "@/helpers/solar/ui/colorPalettes";
import { BuildingInsights } from "geo-env-typing/solar";

export async function createSolarPanelsFromBuildingInsights(buildingInsights: BuildingInsights) {
    const geometryLib: google.maps.GeometryLibrary = (await google.maps.importLibrary(
        "geometry"
    )) as google.maps.GeometryLibrary;
    const solarPotential = buildingInsights.solarPotential;

    const palette = createPalette(panelsPalette, 256).map(rgbToColor);
    const minEnergy = solarPotential.solarPanels.slice(-1)[0].yearlyEnergyDcKwh;
    const maxEnergy = solarPotential.solarPanels[0].yearlyEnergyDcKwh;

    const solarPanels: google.maps.Polygon[] = solarPotential.solarPanels.map((panel) => {
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
                geometryLib.spherical.computeOffset(
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

    return solarPanels;
}
