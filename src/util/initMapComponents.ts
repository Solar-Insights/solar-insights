// Models
import { Coordinates } from "@/models/models";

export async function initMap(coord: Coordinates, mapElement: HTMLElement): Promise<google.maps.Map> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    return new Map(
        mapElement,
        {
            mapTypeId: google.maps.MapTypeId.HYBRID,
            center: { lat: coord.lat, lng: coord.lng },
            zoom: 15,
            minZoom: 14,
            maxZoom: 16,
            clickableIcons: false,
            disableDoubleClickZoom: true,
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
            },
            styles: [
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
            ]
        }
    );
}

export function initMarker(coord: Coordinates, map: google.maps.Map) {
    const marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng }
    });
    marker.setMap(map);
    return marker;
}

export async function initAutocomplete(autocompleteElementId: string): Promise<google.maps.places.Autocomplete> {
    const { Autocomplete } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const input = document.getElementById(autocompleteElementId) as HTMLInputElement;

    // To only accept valid adresses for the autocomplete (no city, country, region, etc.)
    const options = {
        // fields: ["formatted_address"],
        // types: ["address"]
    };
    return new Autocomplete(input, options);
}

// export function initLabelOnlyMap() {
//     return new google.maps.StyledMapType(
//         [
//             {
//                 stylers: [{
//                     visibility: 'off'
//                 }]
//             }, 
//             {
//                 featureType: 'administrative',
//                 elementType: 'labels',
//                 stylers: [
//                     { visibility: 'on' },
//                     { color: '#55595C' }
//                 ]
//             },
//             {
//                 featureType: 'administrative',
//                 elementType: 'labels.text.stroke',
//                 stylers: [
//                     { color: "#FFFFFF"}
//                 ]
//             }
//         ],
//     );
// }