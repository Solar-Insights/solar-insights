<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card class="app-menu-card">
            <v-skeleton-loader :loading="isLoading" type="heading">
                <v-card v-if="isAuthenticated" elevation="0">
                    <v-card-title> {{ user?.nickname }} </v-card-title>
                    <v-card-text> {{ user?.email }} </v-card-text>
                    <v-card
                        @click="logoutUser"
                        class="app-menu-option"
                        elevation="2"
                        :variant="theme === 'dark' ? 'tonal' : 'outlined'"
                    >
                        <v-row>
                            <v-col class="app-menu-option-icon-container" cols="auto" align-self="center">
                                <v-icon>mdi-logout</v-icon>
                            </v-col>
                            <v-col class="app-menu-option-text-container">
                                <div>Sign out</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>

                <v-card
                    v-if="!isAuthenticated"
                    @click="loginUser"
                    class="app-menu-option"
                    elevation="2"
                    :variant="theme === 'dark' ? 'tonal' : 'outlined'"
                >
                    <v-row>
                        <v-col class="app-menu-option-icon-container" cols="auto" align-self="center">
                            <v-icon>mdi-login</v-icon>
                        </v-col>
                        <v-col class="app-menu-option-text-container">
                            <div>Sign in</div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-skeleton-loader>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useAuth0 } from "@auth0/auth0-vue";
import { storeToRefs } from "pinia";

const { isLoading, isAuthenticated, user, loginWithRedirect, logout} = useAuth0();
const userSessionStore = useUserSessionStore();

const { theme } = storeToRefs(userSessionStore);

function loginUser() {
    loginWithRedirect();
}

function logoutUser() {
    logout({
        logoutParams: {
            returnTo: window.location.origin
        }
    });
}
</script>
