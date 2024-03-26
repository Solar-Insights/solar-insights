<template>
    <v-menu
      v-model="showMenu"
      :close-on-content-click="false"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                class="ma-2"
                style="z-index: 9999; position: fixed; top: 0; left: 0"
                icon="mdi-cog"
                elevation="0"
                size="small"
            />
        </template>
        
        <v-card class="pa-2" min-width="200px">

            <v-card 
                @click="userSessionStore.changeTheme()"
                class="pa-2 mb-2"
                rounded="40px"
                elevation="2"
                variant="tonal"
            >
                <v-row>
                    <v-col class="mb-2" cols="3" align-self="center">
                        <v-icon>mdi-lightbulb-on-outline</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div> Theme </div>
                        <div class="detail-text pb-0"> 
                            {{ theme === "dark" ? "Dark" : "Light" }}
                        </div>
                    </v-col>
                </v-row>
            </v-card>

            <v-card 
                @click="userSessionStore.changeLocale(); locale === 'fr' ? $i18n.locale = 'en' : $i18n.locale = 'fr'"
                class="pa-2"
                rounded="40px"
                elevation="2"
                variant="tonal"
            >
                <v-row>
                    <v-col class="mb-2" cols="3" align-self="center">
                        <v-icon>mdi-earth</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div> Language </div>
                        <div class="detail-text pb-0"> 
                            {{ locale === "fr" ? "Français" : "English" }}
                            -> 
                            {{ locale === "fr" ? "English": "Français" }}
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue"; 
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";

const userSessionStore = useUserSessionStore();
const { theme, locale } = storeToRefs(userSessionStore);

const showMenu = ref(false);

</script>
