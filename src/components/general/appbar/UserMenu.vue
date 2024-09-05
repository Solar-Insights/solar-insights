<template>
    <MenuContainer>
        <v-skeleton-loader :loading="isLoading" type="heading">
            <v-card v-if="isAuthenticated" elevation="0">
                <v-card-title> {{ user?.nickname }} </v-card-title>
                <v-card-text> {{ user?.email }} </v-card-text>

                <MenuCard
                    :text="$t(`navigation.my-organization`)"
                    :theme="theme"
                    :icon="`mdi-account-group-outline`"
                    @sendAction="router.push({ name: MY_ORGANIZATION.en.name })"
                />

                <MenuCard
                    :text="$t(`general.user-menu.signout`)"
                    :theme="theme"
                    :icon="`mdi-logout`"
                    @sendAction="logoutUser"
                />
            </v-card>

            <v-card v-if="!isAuthenticated" elevation="0">
                <v-card-title> {{ $t(`general.user-menu.signin-title`) }} </v-card-title>

                <MenuCard
                    :text="$t(`general.user-menu.signin`)"
                    :theme="theme"
                    :icon="`mdi-login`"
                    @sendAction="loginUser"
                />
            </v-card>
        </v-skeleton-loader>
    </MenuContainer>
</template>

<script setup lang="ts">
import MenuContainer from "@/components/general/appbar/MenuContainer.vue";
import MenuCard from "@/components/general/appbar/MenuCard.vue";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useAuth0 } from "@auth0/auth0-vue";
import { storeToRefs } from "pinia";
import { handleUserState } from "@/composables/users";
import { useRouter } from "vue-router";
import { MY_ORGANIZATION } from "@/router/routes";

const router = useRouter();
const { loginUser, logoutUser } = handleUserState();
const { isLoading, isAuthenticated, user } = useAuth0();
const userSessionStore = useUserSessionStore();
const { theme } = storeToRefs(userSessionStore);
</script>
