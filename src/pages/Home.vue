<template>
    <v-card class="pt-0 body-container">
        <div class="home-title-container">
            <div class="home-title"> Drive adoption of solar energy with Solar&nbspInsights </div>
            <div class="home-title-description"> Easy to use, highly adaptive, and accurate. Observe the viability of solar installations in one single search. </div>
            <div class="home-title-action">
                <v-card 
                    :to="{ name: 'solar-map' }"
                    class="pa-8 rounded-lg mx-auto"
                    style="width: 200px;"
                    elevation="2"
                    color="theme"
                >
                    <v-row class="pa-0">
                        <v-col class="pa-0" cols="9">
                            <div style="font-weight: bold;"> Discover potential savings </div>
                        </v-col>
                        <v-col class="pa-0" cols="3">
                            <v-icon>mdi-magnify</v-icon>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>

        <ImageSlider/>

        <div class="home-subtitle-container">
            <div class="home-subtitle"> What can you do with Solar&nbspInsights? </div>
            <div class="home-subtitle-content"> 
                <v-row>
                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-telescope</v-icon>
                        <div class="font-weight-bold mb-3"> Visualize accurate solar data </div>
                        <div> 
                            Observe a building's daily, monthly, or yearly sunshine patterns. Plus, get estimates on the optimal placement of solar panels.
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-hammer</v-icon>
                        <div class="font-weight-bold mb-3"> Customize solar installations </div>
                        <div> 
                            Optimize a solar installation to fit your budget, or your needs. You can even adjust settings manually.  
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-cash</v-icon>
                        <div class="font-weight-bold mb-3"> Assess the viability of solar panels </div>
                        <div> 
                            Customize financial parameters to find out the economic value of solar panels over their lifespan.
                        </div>
                    </v-col>

                    <v-col class="mx-auto px-5" cols="12" xs="12" sm="6" md="3"> 
                        <v-icon class="mb-3 mx-auto" size="x-large">mdi-earth</v-icon>
                        <div class="font-weight-bold mb-3"> Access globally available data </div>
                        <div> 
                            Enjoy the availability and precision of public solar data and weather patterns across the globe, ranging from North America to Oceania.
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import ImageSlider from "@/components/general/ImageSlider.vue";
</script>
