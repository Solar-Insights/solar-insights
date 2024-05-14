<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card class="app-menu-card">
            <v-card
                @click="userSessionStore.changeTheme()"
                class="app-menu-option"
                elevation="2"
                :variant="theme === 'dark' ? 'tonal' : 'outlined'"
            >
                <v-row>
                    <v-col class="app-menu-option-icon-container" cols="auto" align-self="center">
                        <v-icon>mdi-lightbulb-on-outline</v-icon>
                    </v-col>
                    <v-col>
                        <div>{{ $t(`general.quick-settings.theme`) }}</div>
                        <div class="detail-text">
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
                    updateVuetifyLocale();
                    locale === 'fr' ? ($i18n.locale = 'fr') : ($i18n.locale = 'en');
                "
                class="app-menu-option"
                elevation="2"
                :variant="theme === 'dark' ? 'tonal' : 'outlined'"
            >
                <v-row>
                    <v-col class="app-menu-option-icon-container" cols="auto" align-self="center">
                        <v-icon>mdi-earth</v-icon>
                    </v-col>
                    <v-col>
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
import { useLocale } from 'vuetify'

const userSessionStore = useUserSessionStore();
const { theme, locale } = storeToRefs(userSessionStore);
const { current } = useLocale()

function updateVuetifyLocale() {
    current.value = locale.value;
}
</script>
