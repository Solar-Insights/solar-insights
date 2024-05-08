import { OrganizationError } from "@/helpers/customErrors";
import { useUserSessionStore } from "@/stores/userSessionStore";
import AxiosInstance from "@/plugins/axios";
import { MyOrganization, MyOrganizationMember } from "@/helpers/types";

export async function getMyOrganizationInfo() {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/user/my-organization`
    })
        .then((response) => {
            return response.data.myOrganization as MyOrganization; // includes administrators data
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationError());
            throw error;
        });
}

export async function getMyOrganizationMembers() {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/user/my-organization/members`
    })
        .then((response) => {
            return response.data.myOrganizationMembers as MyOrganizationMember[];
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationError());
            throw error;
        });
}

export async function createUserForOrganization(email: string, name: string) {
    return await AxiosInstance({
        method: "post",
        responseType: "json",
        url: `/user/my-organization/members`,
        data: {
            email: email,
            name: name
        }
    })
        .then((response) => {
            return response.data.myOrganizationMember as MyOrganizationMember;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationError());
            throw error;
        });
}

export async function deleteUserFromOrganization(user: MyOrganizationMember) {
    return await AxiosInstance({
        method: "delete",
        responseType: "json",
        url: `/user/my-organization/members`,
        data: {
            myOrganizationMember: user
        }
    })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationError());
            throw error;
        });
}
