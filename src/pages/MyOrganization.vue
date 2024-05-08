<template>
    <v-card class="pt-0 body-container">
        <div class="home-title-container">
            <div class="home-title">Beneva</div>

            <div class="home-title-description">
                The one and only organization associated to your Solar Insights account.
            </div>
        </div>

        <div class="home-subtitle-container pt-16">
            <div class="page-subtitle mb-3">Any question or problem regarding your account?</div>
            <div class="page-subsubtitle mb-3">Contact one of your organization's administrator</div>
            <v-list class="d-flex justify-center flex-wrap">
                <v-list-item v-for="admin in listOfAdmins" class="my-2 mx-auto" :prepend-avatar="admin.avatar">
                    <v-list-item-title> {{ admin.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                        <a :href="`mailto: ${admin.email}`"> {{ admin.email }} </a>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </div>

        <div v-if="isAdmin">
            <AdminComponent />
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdminComponent from "@/components/organization/my_organization_admin/AdminComponent.vue";
import { UserData } from "@/helpers/types";

const isAdmin = ref<boolean>(true);

const listOfAdmins = ref<UserData[]>([
    {
        created_date: "2024-05-01",
        email: "user1@example.com",
        name: "John Doe",
        avatar: "https://s.gravatar.com/avatar/ee05b160c94adaa5c69e28f130fd4b06?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png"
    },
    {
        created_date: "2024-04-25",
        email: "user2@example.com",
        name: "Alice Smith",
        avatar: "https://s.gravatar.com/avatar/ee05b160c94adaa5c69e28f130fd4b06?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png"
    },
    {
        created_date: "2024-04-30",
        email: "user3@example.com",
        name: "Bob Johnson",
        avatar: "https://s.gravatar.com/avatar/ee05b160c94adaa5c69e28f130fd4b06?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png"
    }
]);
</script>
