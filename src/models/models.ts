export type coordinates = {
    lat: number,
    lng: number
};

export function validCoordinates(coord: coordinates) {
    const { lat, lng } = coord;
    const respectLimits = lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    const notNull = lat != null && lng != null;
    
    if ( !(respectLimits && notNull) ) {
        console.log(`the coordinates (lat: ${coord.lat}, lng: ${coord.lng}) do not respect the template of coordinates`);
    }
    return respectLimits && notNull;
};