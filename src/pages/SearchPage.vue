<template>
    <PageSection>
        <PageTitleContainer
            :pageTitle="$t(`search.title`)"
        >
            <v-skeleton-loader class="search-loader" :loading="isLoading" type="chip">
                <AutocompleteField
                    v-if="isAuthenticated"
                    :reverseGeocodeOnLoad="false"
                    @sync-with-new-request="sendToMap"
                />

                <v-card
                    v-else
                    @click="loginUser"
                    class="pa-6 rounded-lg mx-auto"
                    style="width: 250px"
                    elevation="2"
                    color="theme"
                >
                    <v-row class="pa-0">
                        <v-col class="pa-0" cols="9">
                            <div class="font-weight-medium">{{ $t(`search.not-logged-in.action`) }}</div>
                        </v-col>
                        <v-col class="pa-0" cols="3" align-self="center">
                            <v-icon>mdi-login</v-icon>
                        </v-col>
                    </v-row>
                </v-card>
            </v-skeleton-loader>
        </PageTitleContainer>
    </PageSection>

    <PageSection>
        <HelperTimelineSection />
    </PageSection>
</template>

<script setup lang="ts">
import router from "@/plugins/router";
import { LatLng } from "geo-env-typing/geo";
import AutocompleteField from "@/components/general/AutocompleteField.vue";
import HelperTimelineSection from "@/components/search/HelperTimelineSection.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { handleUserState } from "@/composables/users";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSection from "@/components/page_sections/PageSection.vue";

const { loginUser } = handleUserState();

const { isLoading, isAuthenticated } = useAuth0();

function sendToMap(coords: LatLng, address: string) {
    router.push({ name: "solar-map", query: coords });
}
</script>
