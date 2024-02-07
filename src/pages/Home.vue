<template>
    <h1>Home</h1>
    <v-btn :to="{ name: 'air-quality-map' }"> Carte qualite de l'air </v-btn>

    <v-btn :to="{ name: 'solar-map' }"> Carte intensite du soleil </v-btn>
</template>

<script setup lang="ts">
// Emit
const emit = defineEmits(["alert"]);
function emitAlert(type: string, title: string, message: string) {
    emit("alert", {
        type: type,
        title: title,
        message: message,
    });
}
</script>
