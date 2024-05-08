<template>
    <v-card class="pt-0 body-container">
        <div class="home-title-container">
            <div class="home-title"> Organization name </div>

            <div class="home-title-description">
                Find out more about the team you are collaborating with on a daily basis 
            </div>
        </div>

        <div v-if="isAdmin">
            <AdminComponent/>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminComponent from '@/components/organization/my_organization_admin/AdminComponent.vue';

const isAdmin = ref<boolean>(true);
</script>
