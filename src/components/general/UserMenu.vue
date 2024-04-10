<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card class="pa-2" min-width="200px">
            <v-card v-if="!userAuthenticated" @click="login" class="pa-2 mb-2 rounded-lg" elevation="2" variant="tonal">
                <v-row>
                    <v-col cols="3" align-self="center">
                        <v-icon>mdi-login</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div> Sign in </div>
                    </v-col>
                </v-row>
            </v-card>

            <v-card v-if="userAuthenticated" @click="logout" class="pa-2 mb-2 rounded-lg" elevation="2" variant="tonal">
                <v-row>
                    <v-col cols="3" align-self="center">
                        <v-icon>mdi-logout</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div> Sign out </div>
                    </v-col>
                </v-row>
            </v-card>

            <v-card @click="userSessionStore.changeTheme()" class="pa-2 mb-2 rounded-lg" elevation="2" variant="tonal">
                <v-row>
                    <v-col class="mb-2" cols="3" align-self="center">
                        <v-icon>mdi-lightbulb-on-outline</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div>{{ $t(`general.quick-settings.theme`) }}</div>
                        <div class="detail-text pb-0">
                            {{
                                theme === "dark"
                                    ? $t(`general.quick-settings.dark`)
                                    : $t(`general.quick-settings.light`)
                            }}
                        </div>
                    </v-col>
                </v-row>
            </v-card>

            <v-card
                @click="
                    userSessionStore.changeLocale();
                    locale === 'fr' ? ($i18n.locale = 'fr') : ($i18n.locale = 'en');
                "
                class="pa-2 rounded-lg"
                elevation="2"
                variant="tonal"
            >
                <v-row>
                    <v-col class="mb-2" cols="3" align-self="center">
                        <v-icon>mdi-earth</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div>{{ $t(`general.quick-settings.language`) }}</div>
                        <div class="detail-text pb-0">
                            {{ locale === "fr" ? "Français" : "English" }}
                            ->
                            {{ locale === "fr" ? "English" : "Français" }}
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useAuth0 } from '@auth0/auth0-vue';
import { computed } from "vue";

const auth0 = useAuth0();
const userSessionStore = useUserSessionStore();
const { theme, locale } = storeToRefs(userSessionStore);

const userAuthenticated = computed(() => auth0.isAuthenticated.value );

function login() {
    auth0.loginWithRedirect();
}

function logout() {
    auth0.logout({ 
        logoutParams: { 
            returnTo: window.location.origin 
        } 
    });
}
</script>
