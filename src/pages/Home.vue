<template>
    <v-card class="pt-0 body-container">
        <div class="home-title-container">
            <div class="home-title"> {{ $t(`home.home-title-container.title`) }} </div>
            <div class="home-title-description"> {{ $t(`home.home-title-container.description`) }} </div>
            <div class="home-title-action">
                <v-card 
                    :to="{ name: 'solar-map' }"
                    class="pa-6 rounded-lg mx-auto"
                    style="width: 250px;"
                    elevation="2"
                    color="theme"
                >
                    <v-row class="pa-0">
                        <v-col class="pa-0" cols="9">
                            <div style="font-weight: bold;"> {{ $t(`home.home-title-container.action`) }} </div>
                        </v-col>
                        <v-col class="pa-0" cols="3">
                            <v-icon>mdi-magnify</v-icon>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>

        <v-img v-if="theme === 'dark'" class="home-main-image" :src="home_main_image_dark"/>
        <v-img v-if="theme === 'light'" class="home-main-image" :src="home_main_image_light"/>

        <div class="home-subtitle-container">
            <div class="home-subtitle"> {{ $t(`home.usecase-subtitle-container.subtitle`) }} </div>
            <div class="home-subtitle-content"> 
                <v-row>
                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-telescope</v-icon>
                        <div class="font-weight-bold mb-3"> {{ $t(`home.usecase-subtitle-container.visualize.title`) }} </div>
                        <div> 
                            {{ $t(`home.usecase-subtitle-container.visualize.description`) }}
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-hammer</v-icon>
                        <div class="font-weight-bold mb-3"> {{ $t(`home.usecase-subtitle-container.customize.title`) }}  </div>
                        <div> 
                            {{ $t(`home.usecase-subtitle-container.customize.description`) }}  
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-cash</v-icon>
                        <div class="font-weight-bold mb-3"> {{ $t(`home.usecase-subtitle-container.viability.title`) }}  </div>
                        <div> 
                            {{ $t(`home.usecase-subtitle-container.viability.description`) }}
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-earth</v-icon>
                        <div class="font-weight-bold mb-3"> {{ $t(`home.usecase-subtitle-container.global.title`) }} </div>
                        <div> 
                            {{ $t(`home.usecase-subtitle-container.global.description`) }}
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import home_main_image_dark from "@/assets/images/home_main_image_dark.png";
import home_main_image_light from "@/assets/images/home_main_image_light.png";
// Vue
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";

const userSessionStore = useUserSessionStore();
const { theme } = storeToRefs(userSessionStore);

</script>
