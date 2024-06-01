<template>
    <v-text-field
        v-model="autocompleteValue"
        @keypress.enter="prepareHandlerEnterKeyOnSearchBar"
        class="autocomplete-search"
        id="autocomplete-search"
        :class="$vuetify.display.smAndDown ? 'autocomplete-search-mobile' : 'autocomplete-search-computer'"
        :placeholder="$t('general.map-header.search-placeholder')"
        hide-details
        variant="outlined"
        rounded
        prepend-inner-icon="mdi-google-maps"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, PropType } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { initAutocomplete, prepareHandlerEnterKeyOnSearchBar } from "@/helpers/solar/map/components_util";
import { LatLng } from "geo-env-typing/geo";
import { getGeocoding, getReverseGeocoding } from "@/api/geo";
import { AutocompleteInputError } from "@/helpers/alerts/errors";

const userSessionStore = useUserSessionStore();

const autocompleteValue = ref<string | null>("");
let autocomplete: google.maps.places.Autocomplete;
let autocompleteAlreadyChanged: boolean = false; // Because enter key triggers 2 events (arrow keydown + enter), prevent first one from sending request

const props = defineProps({
    coord: {
        type: Object as PropType<LatLng>,
        default: {
            lat: 0,
            lng: 0
        }
    },
    reverseGeocodeOnLoad: {
        type: Boolean,
        required: true,
        default: false
    }
});

const emits = defineEmits(["syncWithNewRequest"]);

onMounted(async () => {
    autocomplete = await initAutocomplete();

    if (props.reverseGeocodeOnLoad) {
        await getReverseGeocoding(props.coord)
            .then((address: string) => {
                autocompleteValue.value = address;
                emits("syncWithNewRequest", props.coord, autocompleteValue.value);
            })
            .catch((error) => {});
    }

    await initListeners();
});

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
