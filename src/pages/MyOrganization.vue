<template>
    <v-card class="pt-0 body-container">
        <div class="page-title-container">
            <v-skeleton-loader v-if="myOrganization.name === ''" type="text"/>

            <div class="page-title"> 
                {{ myOrganization.name }} 
            </div>

            <div class="page-title-precision">
                {{ $t(`my-organization.page-title-container.description`) }}
            </div>
        </div>

        <div class="home-subtitle-container pt-16">
            <div class="page-subtitle mb-3">{{ $t(`my-organization.help-subtitle-container.subtitle`) }}</div>
            <div class="page-subsubtitle mb-3">{{ $t(`my-organization.help-subtitle-container.description`) }}</div>
            

            <v-list class="d-flex justify-center flex-wrap">
                <v-list-item v-if="myOrganization.admins.length === 0" class="my-2 mx-auto" min-width="320px">
                    <v-skeleton-loader type="avatar, sentences"/>
                </v-list-item>

                <v-list-item v-for="admin in myOrganization.admins" class="my-2 mx-auto" :prepend-avatar="admin.avatar">
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
import { computed, onMounted, ref } from "vue";
import AdminComponent from "@/components/organization/my_organization_admin/AdminComponent.vue";
import { MyOrganization, MyOrganizationMember } from "@/helpers/types";
import { getMyOrganizationInfo } from "@/api/user";
import { useAuth0 } from "@auth0/auth0-vue";

const { user } = useAuth0();

const isAdmin = computed(() => 
    myOrganization.value.admins.findIndex(
        (admin) => admin.email === user.value?.email
    ) !== -1
);

const myOrganization = ref<MyOrganization>({
    admins: [],
    name: ""
});

onMounted(async () => {
    await getMyOrganizationInfo()
        .then((data: MyOrganization) => {
            myOrganization.value = data;
        })
        .catch(() => {});
})
</script>
