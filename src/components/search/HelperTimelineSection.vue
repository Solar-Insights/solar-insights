<template>
    <div class="home-subtitle-container pt-12">
            <div class="home-subtitle"> A {{ steps.length }}-step starter guide to Solar Insights </div>
            <div class="home-subtitle-content">
                <v-timeline density="compact">
                    <v-timeline-item
                        v-for="(step, i) in steps"
                        :key="i"
                        min-width="100%"
                        fill-dot
                        dot-color="theme"
                        :icon="step.icon"
                    >
                        <v-card class="rounded-lg" variant="outlined">
                            <v-card-title class="d-flex"> 
                                <div class="mr-6">
                                    {{ i + 1 }}
                                </div>
                                <div>
                                    {{ step.title }}
                                </div>
                            </v-card-title>
                            <v-card-text class="pa-2">
                                <div v-for="content in step.contents" class="pa-2" v-html="content"></div>
                                <v-img v-for="img in step.images" class="mx-auto my-6" :src="img" cover height="300" width="500"/>
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import optimizations_en from "@/assets/images/search/optimizations_en.png";
import panels_section from "@/assets/images/search/panels_section_en.png";
import settings_en from "@/assets/images/search/settings_en.png";
import solar_insights_en from "@/assets/images/search/solar_insights_en.png";


const steps = ref([
    {
        icon: "mdi-magnify",
        title: "Find a building",
        contents: ["Use the above text field to locate buildings.", "You will be redirected to the map to start creating a new solar installation."],
        images: []
    },
    {
        icon: "mdi-weather-sunny",
        title: "Gain insights on a solar installation",
        contents: ["Once redirected, take a look at the <b>Solar Insights</b> panel.", "It displays valuable informations about the solar installation of building.", "By default, the installation is opmitized to maximize total savings."],
        images: [solar_insights_en]
    },
    {
        icon: "mdi-pencil",
        title: "Customize a solar installation and its parameters",
        contents: ["Two sections enable you to customize your installation and parameters used for their analysis:", "The <b>Panels</b> section contains parameters like the power rating and the yearly efficiency decline of panels. They have been prefilled with industry-standard values.", "The <b>Cost and incentives</b> section incorporates financial data for the average Canadian household.", "Make adjustments to these sections to better reflect your unique situation."],
        images: [panels_section]
    },
    {
        icon: "mdi-podium-gold",
        title: "Optimize a solar installation",
        contents:  ["The <b>Optimizations</b> section is aimed at users wishing to optimize the current solar installation for a specific criteria", "Select the one you prefer, and see the changes for yourself!"],
        images: [optimizations_en]
    },
    {
        icon: "mdi-map-marker",
        title: "Adjust the look and feel of the map",
        contents:  ["The <b>Settings</b> section gives you the ability to enable / disable the visbility of certain map elements like the panels.", "Also, you can use the drop-down menu to display monthly or daily solar patterns."],
        images: [settings_en]
    }
]);

</script>