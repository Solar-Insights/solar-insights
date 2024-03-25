<template>
    <h1>Home</h1>
    <v-btn class="ma-3" @click="$i18n.locale = 'fr'"> Français </v-btn>
    <v-btn class="ma-3" @click="$i18n.locale = 'en'"> English </v-btn>
    <div class="ma-3"> {{ $t("hello") }} </div>
</template>

<script setup lang="ts"></script>
