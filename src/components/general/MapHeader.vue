<template>
    <v-breadcrumbs 
        class="pb-0 mx-auto" 
        :items="[ 
            { 
                title: 'Home', 
                disabled: false, 
                to: { name: 'home' } 
            }, 
            { 
                title: currentRouteInformation.displayedName, 
                disabled: true, 
                to: { name: currentRouteInformation.routeName } 
            }
        ]"
    />

    <v-card-title class="text-center font-weight-regular">
        <v-icon class="mr-2"> {{ currentRouteInformation.icon }} </v-icon> {{ currentRouteInformation.displayedName }}
    </v-card-title>

    <v-text-field
        v-model="autocompleteValue"
        @keypress.enter="prepareHandlerEnterKeyOnSearchBar"
        class="mt-0"
        id="autocomplete-search"
        :class="$vuetify.display.xs ? 'autocomplete-search-mobile' : 'autocomplete-search-computer'"
        placeholder="Find a location"
        hide-details
        variant="outlined"
        prepend-inner-icon="mdi-google-maps"
    />
</template>

<script setup lang="ts">
// Vue
import { computed, ref, onMounted, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { useUserSessionStore } from '@/stores/userSessionStore';
// Utils
import { initAutocomplete, prepareHandlerEnterKeyOnSearchBar } from '@/helpers/util';
import { LatLng } from 'geo-env-typing/geo';
import { getGeocoding, getReverseGeocoding } from '@/server/geo';
import { AutocompleteInputError } from '@/helpers/customErrors';

const userSessionStore = useUserSessionStore();
const currentRoute = useRoute();

const currentRouteInformation = computed(() => {
    if (currentRoute.name === "solar-map") {
        return {
            displayedName: "Solar Potential",
            routeName: "solar-map",
            icon: "mdi-weather-sunny"
        };
    } 
    else { //if (currentRoute.name === "air-quality-map") {
        return {
            displayedName: "Air Quality",
            routeName: "air-quality-map",
            icon: "mdi-weather-windy"
        };
    }
})

const autocompleteValue = ref<string | null>("")
let autocomplete: google.maps.places.Autocomplete;
let autocompleteAlreadyChanged: boolean = false; // Because enter key triggers 2 events (arrow keydown + enter), prevent first one from sending request

const props = defineProps({
    coord: {
        type: Object as PropType<LatLng>,
        required: true,
        default: {
            lat: 0,
            lng: 0
        }
    }
});

const emits = defineEmits(["syncWithNewRequest"]);

onMounted(async () => {
    autocomplete = await initAutocomplete();

    autocompleteValue.value = await getReverseGeocoding(props.coord)
        .then((address: string) => {
            return address;
        })
        .catch((error) => {
            return ""; // DO_SOMETHING
        });

    await initListeners();

    emits("syncWithNewRequest", props.coord, autocompleteValue.value);
})

async function initListeners() {
    await setPlaceChangedOnAutocompleteListener();
}

async function setPlaceChangedOnAutocompleteListener() {
    autocomplete.addListener("place_changed", async () => {
        const newPlace: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (!newPlace || !newPlace.formatted_address) {
            if (autocompleteAlreadyChanged) {
                userSessionStore.setAlert(new AutocompleteInputError());
                autocompleteAlreadyChanged = false;
                return;
            } else {
                autocompleteAlreadyChanged = true;
                return;
            }
        }

        autocompleteAlreadyChanged = false;
        await getGeocoding(newPlace.formatted_address)
            .then(async (newCoord: LatLng) => {
                autocompleteValue.value = newPlace.formatted_address!;
                emits("syncWithNewRequest", newCoord, newPlace.formatted_address);
            })
            .catch((error) => {
                autocompleteValue.value = "";
            });
    });
}

</script>