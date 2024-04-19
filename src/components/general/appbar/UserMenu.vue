<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card class="app-menu-card">
            <v-skeleton-loader :loading="authProcessGoingOn" type="heading">
                <v-card v-if="auth0.isAuthenticated.value" elevation="0">
                    <v-card-title> {{ auth0.user.value?.nickname }} </v-card-title>
                    <v-card-text> {{ auth0.user.value?.email }} </v-card-text>
                </v-card>

                <v-card
                    v-if="!auth0.isAuthenticated.value"
                    @click="login"
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

                <v-card
                    v-if="auth0.isAuthenticated.value"
                    @click="logout"
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
            </v-skeleton-loader>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useAuth0 } from "@auth0/auth0-vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const auth0 = useAuth0();
const userSessionStore = useUserSessionStore();

const { theme } = storeToRefs(userSessionStore);
const authProcessGoingOn = computed(
    () => auth0.isLoading.value || (!auth0.isAuthenticated.value && userSessionStore.accessToken !== "")
);

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
