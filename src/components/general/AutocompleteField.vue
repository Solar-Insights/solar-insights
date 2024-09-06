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
import { ref, onMounted } from "vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useI18n } from "vue-i18n";
import { initAutocomplete, prepareHandlerEnterKeyOnSearchBar } from "@/helpers/solar/map/components_util";
import { AutocompleteInputError } from "@/helpers/alerts/errors";

const userSessionStore = useUserSessionStore();

const t = useI18n().t;

const autocompleteValue = ref<string | null>("");
let autocomplete: google.maps.places.Autocomplete;
let autocompleteAlreadyChanged: boolean = false; // Because enter key triggers 2 events (arrow keydown + enter), prevent first one from sending request

const emits = defineEmits(["makeNewSolarInstallationRequest"]);

onMounted(async () => {
    autocomplete = await initAutocomplete();
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

        const resultingAddress = newPlace.formatted_address === undefined ? t(`solar.data-panel.header.reverse-geocoding-error`) : newPlace.formatted_address;
        emits("makeNewSolarInstallationRequest", resultingAddress);
    });
}
</script>
