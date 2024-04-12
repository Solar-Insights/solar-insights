<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card class="pa-2" min-width="200px">
            <v-card v-if="auth0.isAuthenticated.value && !auth0.isLoading.value" elevation="0">
                <v-card-title> {{ auth0.user.value!.nickname }} </v-card-title>
                <v-card-text> {{ auth0.user.value!.email }} </v-card-text>
            </v-card>

            <v-card v-if="!userAuthenticated" @click="login" class="pa-2 mb-2 rounded-lg" elevation="2" variant="tonal">
                <v-row>
                    <v-col cols="3" align-self="center">
                        <v-icon>mdi-login</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div>Sign in</div>
                    </v-col>
                </v-row>
            </v-card>

            <v-card v-if="userAuthenticated" @click="logout" class="pa-2 mb-2 rounded-lg" elevation="2" variant="tonal">
                <v-row>
                    <v-col cols="3" align-self="center">
                        <v-icon>mdi-logout</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div>Sign out</div>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { computed } from "vue";

const auth0 = useAuth0();
const userAuthenticated = computed(() => auth0.isAuthenticated.value);

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
