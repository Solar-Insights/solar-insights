<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card class="app-menu-card">
            <v-skeleton-loader :loading="isLoading" type="heading">
                <v-card v-if="isAuthenticated" elevation="0">
                    <v-card-title> {{ user?.nickname }} </v-card-title>
                    <v-card-text> {{ user?.email }} </v-card-text>
                    {{ user }}
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
                                <div>{{ $t(`general.user-menu.signout`) }}</div>
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
                            <div>{{ $t(`general.user-menu.signin`) }}</div>
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
import { handleUserState } from "@/composables/users";

const { loginUser, logoutUser } = handleUserState();
const { isLoading, isAuthenticated, user } = useAuth0();
const userSessionStore = useUserSessionStore();
const { theme } = storeToRefs(userSessionStore);
</script>
