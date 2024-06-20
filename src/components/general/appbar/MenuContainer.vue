<template>
    <v-menu activator="parent" :close-on-content-click="false">
        <v-card class="app-menu-container" elevation="20" border>
            <slot></slot>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts"></script>
