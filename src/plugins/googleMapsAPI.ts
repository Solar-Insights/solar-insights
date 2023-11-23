// Models
import { coordinates, validCoordinates, airQualityData, airPollutant } from "@/models/models";

export async function geocoding(formattedAddress: string) {
    const geocoder = new google.maps.Geocoder()
    const coord: coordinates = {
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


export async function reverseGeocoding(coord: coordinates) {
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


export async function getAirQualityData(coord: coordinates) {
    // https://developers.google.com/maps/documentation/air-quality/reference/rest/v1/currentConditions/lookup#request-body
    let airQualityData: airQualityData = {} as airQualityData;
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
        airQualityData = await response.json();
        makeDominantPollutantFirst(airQualityData.indexes[0].dominantPollutant, airQualityData.pollutants);
    })
    .catch((error) => {
        console.log("an error has occured when fetching the air quality data");
    })
    return airQualityData;
}

function makeDominantPollutantFirst(dominantPollutant: string, listOfPollutants: airPollutant[]) {
    const index = listOfPollutants.findIndex(pollutant => pollutant.code == dominantPollutant);
    if (index != -1) {
        listOfPollutants.sort((a, b) => {
            if (a.code == dominantPollutant) return -1;
            if (b.code == dominantPollutant) return -1;
            return a.code.localeCompare(b.code);
        });
    }
}