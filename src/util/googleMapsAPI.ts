// Models
import { Coordinates, validCoordinates, AirQualityData, AirPollutant, BuildingInsights } from "@/models/models";

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

export function getSolarData(coord: Coordinates) {
    const requestUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${coord.lat}&location.longitude=${coord.lng}&key=${import.meta.env.VITE_GOOGLE_API}`
    return fetch(requestUrl)
        .then((response) => {
            return response.json() as Promise<BuildingInsights>;
        })
};