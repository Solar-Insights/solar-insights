<template>
    <v-app>
        <v-main>
            <v-container class="h-100 pa-0" fluid style="position: relative">
                <AlertComponent :type="alertValue.type" :title="alertValue.title" :message="alertValue.message" v-if="displayAlert"/>
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
    type: String,
    title: String,
    message: String
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
}
</script>