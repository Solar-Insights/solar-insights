// Models
import { coordinates, validCoordinates, airQualityData } from "@/models/models";

export async function initMap(coord: coordinates, mapElement: HTMLElement): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    return new Map(
        mapElement,
        {
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            center: { lat: coord.lat, lng: coord.lng },
            zoom: 15,
            minZoom: 14,
            maxZoom: 16,
            clickableIcons: false,
            disableDoubleClickZoom: false,
            isFractionalZoomEnabled: false,
            keyboardShortcuts: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            rotateControl: false,
            restriction: {
                latLngBounds:{
                    north: 85.0, 
                    south: -60.0, 
                    west: -179.0, 
                    east: 179.0
                },
                strictBounds : true
            }
        }
    );
}

export function addMarker(coord: coordinates, map: google.maps.Map) {
    const marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng }
    });
    marker.setMap(map);
    return marker;
}

export function initLabelOnlyMap() {
    return new google.maps.StyledMapType(
        [
            {
                stylers: [{
                    visibility: 'off'
                }]
            }, 
            {
                featureType: 'administrative',
                elementType: 'labels',
                stylers: [
                    { visibility: 'on' },
                    { color: '#55595C' }
                ]
            },
            {
                featureType: 'administrative',
                elementType: 'labels.text.stroke',
                stylers: [
                    { color: "#FFFFFF"}
                ]
            }
        ],
    );
}

export async function initAutocomplete(autocompleteElementId: string): Promise<google.maps.places.Autocomplete> {
    const { Autocomplete } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const input = document.getElementById(autocompleteElementId) as HTMLInputElement;
    const options = {
        fields: ["formatted_address"],
        types: ["address"]
    };
    return new Autocomplete(input, options);
}

export async function getCoordinatesFromAddress(formattedAddress: string) {
    console.log("get coordinates of formatted address");
    const coord: coordinates = await getGeocoding(formattedAddress);
    if ( coord.lat == 0 && coord.lng == 0) {
        console.log("enter an address");
    }
    else if ( validCoordinates(coord) ) {
        return coord;
    }
}

async function getGeocoding(formattedAddress: string): Promise<coordinates> {
    console.log("get lat and lng from address");
    const geocoder = new google.maps.Geocoder()
    const options = {
        address: formattedAddress
    };
    const coord: coordinates = {
        lat: 0,
        lng: 0
    };
    await geocoder.geocode(options)
        .then((geocodingRequest: google.maps.GeocoderResponse) => {
            coord.lat = geocodingRequest.results[0].geometry.location.lat();
            coord.lng = geocodingRequest.results[0].geometry.location.lng();
        })
        .catch((error) => {
            console.log(error);
        })

    return coord;
}

export async function getAirQualityData(coord: coordinates) {
    let airQualityData: airQualityData = {};
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
            "POLLUTANT_ADDITIONAL_INFO"
        ]
    };

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    })
    .then(async (response) => {
        airQualityData = await response.json();
    })
    .catch((error) => {
        console.log("an error has occured when fetching the air quality data");
    })
    return airQualityData;
}