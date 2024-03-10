// Vue
import { defineStore } from "pinia";
// Helpers
import { LatLng } from "geo-env-typing/geo";
import { AirQualityData } from "geo-env-typing/air";
import { initMarker } from "@/helpers/util";
// Server
import { getAirQualityData } from "@/server/air";

export const useAirMapStore = defineStore("airMapStore", {
    state: () => ({
        airQualityData: {} as AirQualityData,
        map: {} as google.maps.Map,
        marker: {} as google.maps.Marker,
        centerCoord: { lat: 46.811943, lng: -71.205002 } as LatLng
    }),

    actions: {
        async syncWithNewRequest(newCoord: LatLng, formattedAddress: string) {
            this.map.setCenter({ lat: newCoord.lat, lng: newCoord.lng });
            this.marker.setMap(null);
            this.marker = initMarker(newCoord, this.map);
        
            await getAirQualityData(newCoord)
                .then((data: AirQualityData) => {
                    this.airQualityData = data;
                })
                .catch(() => {
                    // DO_SOMETHING
                });
        }
    }
});
