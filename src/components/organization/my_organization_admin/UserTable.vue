<template>
    <PageSubtitleContainer :pageSubtitle="$t(`my-organization.admin-component.title`)" />

    <v-data-table :items="users" :headers="headers" :sort-by="[{ key: 'created_date', order: 'desc' }]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title> {{ $t(`my-organization.admin-component.user-table.title`) }} </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn class="mb-2 font-weight-bold" color="theme">
                    {{ $t(`my-organization.admin-component.user-table.actions.new-user.action-name`) }}

                    <NewUserForm @formWasSent="userCreated"/>
                </v-btn>
            </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn size="small" icon flat>
                <v-icon>mdi-delete</v-icon>

                <DeleteUserForm
                    :selectedUserToDelete="item"
                    @formWasSent="userDeleted"
                />
            </v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { MyOrganizationMember } from "@/helpers/types";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import PageSubtitleContainer from "@/components/page_sections/PageSubtitleContainer.vue";
import NewUserForm from "@/components/organization/my_organization_admin/NewUserForm.vue";
import DeleteUserForm from "@/components/organization/my_organization_admin/DeleteUserForm.vue";

const t = useI18n().t;
const UserDataHeaders = computed(() => [
    {
        title: t(`my-organization.admin-component.user-table.column-titles.email`),
        key: "email",
        sortable: true
    },
    {
        title: t(`my-organization.admin-component.user-table.column-titles.name`),
        key: "name",
        sortable: true
    },
    {
        title: t(`my-organization.admin-component.user-table.column-titles.creation-date`),
        key: "created_date",
        sortable: true
    },
    {
        title: t(`my-organization.admin-component.user-table.column-titles.actions`),
        key: "actions",
        align: "center",
        sortable: false
    }
] as any[]);

const props = defineProps({
    users: {
        type: Object as PropType<MyOrganizationMember[]>,
        required: true
    }
});

const emits = defineEmits(["addUser", "deleteUser"]);

const headers = ref(UserDataHeaders);

function userCreated(newMember: MyOrganizationMember) {
    emits("addUser", newMember);
}

function userDeleted(deletedMember: MyOrganizationMember) {
    emits("deleteUser", deletedMember);
}
</script>
