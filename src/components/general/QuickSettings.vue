<template>
    <v-menu
      v-model="showMenu"
      :close-on-content-click="false"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                icon="mdi-cog"
                elevation="0"
                size="small"
            />
        </template>
        
        <v-card class="pa-2" min-width="200px">

            <v-card 
                @click="userSessionStore.changeTheme()"
                class="pa-2 mb-2 rounded-lg"
                elevation="2"
                variant="tonal"
            >
                <v-row>
                    <v-col class="mb-2" cols="3" align-self="center">
                        <v-icon>mdi-lightbulb-on-outline</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div> {{ $t(`general.quick-settings.theme`) }} </div>
                        <div class="detail-text pb-0"> 
                            {{ 
                                theme === "dark" ? $t(`general.quick-settings.dark`) : $t(`general.quick-settings.light`)
                            }}
                        </div>
                    </v-col>
                </v-row>
            </v-card>

            <v-card 
                @click="userSessionStore.changeLocale(); locale === 'fr' ? $i18n.locale = 'fr' : $i18n.locale = 'en'"
                class="pa-2 rounded-lg"
                elevation="2"
                variant="tonal"
            >
                <v-row>
                    <v-col class="mb-2" cols="3" align-self="center">
                        <v-icon>mdi-earth</v-icon>
                    </v-col>
                    <v-col cols="9">
                        <div> {{ $t(`general.quick-settings.language`) }} </div>
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
