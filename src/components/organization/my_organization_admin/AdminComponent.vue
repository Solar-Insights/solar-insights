<template>
    <h1> I am admin </h1>
    <div class="home-subtitle-container">
        <div class="home-subtitle-content">
            <UserTable :users="fakeUsers"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserData } from '@/helpers/types';
import { ref } from 'vue';
import UserTable from '@/components/organization//my_organization_admin/UserTable.vue';

const fakeUsers = ref<UserData[]>([
  { created_date: "2024-05-01", email: "user1@example.com", name: "John Doe" },
  { created_date: "2024-04-25", email: "user2@example.com", name: "Alice Smith" },
  { created_date: "2024-04-30", email: "user3@example.com", name: "Bob Johnson" },
  { created_date: "2024-04-27", email: "user4@example.com", name: "Emma Brown" },
  { created_date: "2024-05-02", email: "user5@example.com", name: "David Wilson" },
  { created_date: "2024-04-29", email: "user6@example.com", name: "Sophia Lee" },
  { created_date: "2024-04-26", email: "user7@example.com", name: "James Garcia" },
  { created_date: "2025-05-03", email: "user8@example.com", name: "Olivia Martinez" },
  { created_date: "2024-04-28", email: "user9@example.com", name: "William Rodriguez" },
  { created_date: "2024-05-04", email: "user10@example.com", name: "Ava Hernandez" }
]);
</script>