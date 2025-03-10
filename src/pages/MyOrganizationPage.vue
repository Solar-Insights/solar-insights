<template>
    <PageContainer v-if="stringHasValue(myOrganization.name)">
        <PageSection>
            <PageTitleContainer :pageTitle="myOrganization.name" />
        </PageSection>

        <PageSection>
            <PageSubtitleContainer
                :subtitle="$t(`my-organization.help-section-container.title`)"
                :precision="$t(`my-organization.help-section-container.subtitle`)"
                :center="false"
            >
                <v-list class="d-flex flex-wrap">
                    <v-list-item v-for="admin in myOrganization.admins" class="my-2" :prepend-avatar="admin.avatar">
                        <v-list-item-title> {{ admin.name }}</v-list-item-title>
                        <v-list-item-subtitle>
                            <a :href="`mailto: ${admin.email}`"> {{ admin.email }} </a>
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </PageSubtitleContainer>
        </PageSection>

        <AdminComponent v-if="isAdmin" />
    </PageContainer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AdminComponent from "@/components/organization/my_organization_admin/AdminComponent.vue";
import { MyOrganization } from "@/helpers/types";
import { getMyOrganizationInfo } from "@/api/user";
import { useAuth0 } from "@auth0/auth0-vue";
import PageTitleContainer from "@/components/page_sections/PageTitleContainer.vue";
import PageSection from "@/components/page_sections/PageSection.vue";
import PageContainer from "@/components/page_sections/PageContainer.vue";
import { stringHasValue } from "@/helpers/componentConditionals";
import { useHead } from "unhead";
import { headSelector, MY_ORGANIZATION } from "@/router/routes";
import { useUserSessionStore } from "@/stores/userSessionStore";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";

const userSessionStore = useUserSessionStore();

useHead(headSelector(MY_ORGANIZATION, userSessionStore.locale));

const { user } = useAuth0();

const isAdmin = computed(
    () => myOrganization.value.admins.findIndex((admin) => admin.email === user.value?.email) !== -1
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
});
</script>
