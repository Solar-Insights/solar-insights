import { coordinates } from "@/models/models";

export function getSolarData(coord: coordinates) {
    const requestUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${coord.lat}&location.longitude=${coord.lng}&key=${import.meta.env.VITE_GOOGLE_API}`
    return fetch(requestUrl)
        .then((response) => {
            return response.json() as Promise<JSON>;
        })
};