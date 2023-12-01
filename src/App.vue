<template>
    <v-app>
        <v-main>
            <v-container class="app-container" fluid>
                <AlertComponent v-if="displayAlert" :type="alertValue.type" :title="alertValue.title" :message="alertValue.message"/>
                <router-view :key="$route.fullPath" @alert="handleAlert"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Vue
import { ref, reactive } from 'vue';
// Components
import AlertComponent from '@/components/misc/AlertComponent.vue';

type alertData = {
    type: string,
    title: string,
    message: string
};

const displayAlert = ref(true);
const alertValue: alertData = reactive({
    type: "",
    title: "",
    message: ""
});

const handleAlert = (data: alertData) => {
    displayAlert.value = true;
    alertValue.type = data.type;
    alertValue.title = data.title;
    alertValue.message = data.message;
    console.log("setting a timeout")
    const timeout = setTimeout(() => { displayAlert.value = false }, 5000);
}
</script>