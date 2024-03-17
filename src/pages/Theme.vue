<template>
    <div class="ma-8">

    
        <v-row class="d-flex align-center justify-center">
            <h1 class="text-h2 font-weight-bold"> Themes </h1>
        </v-row>
        
        <v-row class="mt-8">
            <v-col v-for="liste in palette" cols="4">
                <v-row 
                    v-for="(colorclass, color) in liste" 
                    class="align-center justify-center ma-1"
                    :class="`bg-${color}`"
                >
                    {{ color }}
                </v-row>
            </v-col>
        </v-row>
        

        <v-row class="d-flex align-center justify-center">
            <v-col cols="auto"> 
                <v-btn color="primary"> Primary </v-btn> 
            </v-col>
            <v-col cols="auto">
                <v-btn color="secondary"> Secondary </v-btn>
            </v-col>
            <v-col cols="auto"> 
                <v-btn color="error"> Error </v-btn> 
            </v-col>
        </v-row>

        <v-row class="d-flex align-center justify-center">
            <v-col cols="auto">
                <v-btn color="info"> Info </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="success"> Success </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="warning"> Warning </v-btn>
            </v-col>
        </v-row>

        <v-row class="d-flex align-center justify-center">
            <v-card class="ma-1 flex-grow-1" v-for="i in 5">
                <v-card style="background-color: rgba(80, 164, 144, 0.16);">
                    <v-card-title> v-card </v-card-title>
                    <v-card-text></v-card-text>
                </v-card>
            </v-card>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const palette = ref([
    {
        "theme": "#50a490",
        "theme-darker-1": "#489381",
        "theme-darker-2": "#408373",
        "theme-darker-3": "#387264",
        "theme-darker-4": "#306256",
    }, 
    {
        "theme": "#50a490",
        "theme-lighter-1": "#61AD9B",
        "theme-lighter-2": "#73B6A6",
        "theme-lighter-3": "#84BFB1",
        "theme-lighter-4": "96C8BC",
    }
])

</script>