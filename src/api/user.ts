import {
    OrganizationInfosError,
    OrganizationUserCreationError,
    OrganizationUserCreationQuotaError,
    OrganizationUserDeletionError
} from "@/helpers/alerts/errors";
import { useUserSessionStore } from "@/stores/userSessionStore";
import AxiosInstance from "@/plugins/axios";
import {
    MyOrganization,
    MyOrganizationAdminDetails,
    MyOrganizationMember,
    NewOrganizationUserForm
} from "@/helpers/types";
import { OrganizationUserCreationSuccess, OrganizationUserDeletionSuccess } from "@/helpers/alerts/success";
import { AxiosError } from "axios";

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
            useUserSessionStore().setAlert(new OrganizationInfosError());
            throw error;
        });
}

export async function getMyOrganizationAdminData() {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/user/my-organization/admin-details`
    })
        .then((response) => {
            const myOrganizationAdminDetails: MyOrganizationAdminDetails = response.data;
            myOrganizationAdminDetails.myOrganizationMembers.forEach((member) => {
                member.created_date = cleanIsoStringToKeepYYYYmmdd(member.created_date);
            });
            return myOrganizationAdminDetails;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationInfosError());
            throw error;
        });
}

export async function createUserForOrganization(newUserForm: NewOrganizationUserForm) {
    return await AxiosInstance({
        method: "post",
        responseType: "json",
        url: `/user/my-organization/members`,
        data: newUserForm
    })
        .then((response) => {
            const myOrganizationMember: MyOrganizationMember = response.data.myOrganizationMember;
            myOrganizationMember.created_date = cleanIsoStringToKeepYYYYmmdd(myOrganizationMember.created_date);
            useUserSessionStore().setAlert(new OrganizationUserCreationSuccess());
            return myOrganizationMember;
        })
        .catch((error: AxiosError) => {
            if (error.response && error.response.status === 422) {
                useUserSessionStore().setAlert(new OrganizationUserCreationQuotaError());
            } else {
                useUserSessionStore().setAlert(new OrganizationUserCreationError());
            }

            throw error;
        });
}

export async function deleteUserFromOrganization(user: MyOrganizationMember) {
    await AxiosInstance({
        method: "delete",
        responseType: "json",
        url: `/user/my-organization/members`,
        data: {
            myOrganizationMember: user
        }
    })
        .then((response) => {
            useUserSessionStore().setAlert(new OrganizationUserDeletionSuccess());
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationUserDeletionError());
            throw error;
        });
}

function cleanIsoStringToKeepYYYYmmdd(isoString: string) {
    if (isoString.length < 10) return isoString;
    return isoString.substring(0, 10);
}
