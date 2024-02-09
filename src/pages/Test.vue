<template>
    <v-container>
        <h1>Test page</h1>
        <div>
            {{ mockedData }}
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {} from "@/server/util";

const mockedData = ref();

onMounted(async () => {});
</script>
