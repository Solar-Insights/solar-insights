<template>
    <v-card class="pt-0 body-container">
        <PageTitleContainer
            :pageTitle="myOrganization.name"
            :pageTitlePrecision="$t(`my-organization.page-title-container.description`)"
        />

        <!-- 
            Was previously in page title, to check
            <v-skeleton-loader v-if="myOrganization.name === ''" type="text"/>
         -->


         <PageSubtitleContainer
            :pageSubtitle="$t(`my-organization.help-subtitle-container.subtitle`)"
            :pageSubtitlePrecision="$t(`my-organization.help-subtitle-container.description`)"
         >
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
         </PageSubtitleContainer>

        <div v-if="isAdmin">
            <AdminComponent />
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AdminComponent from "@/components/organization/my_organization_admin/AdminComponent.vue";
import { MyOrganization } from "@/helpers/types";
import { getMyOrganizationInfo } from "@/api/user";
import { useAuth0 } from "@auth0/auth0-vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";

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
