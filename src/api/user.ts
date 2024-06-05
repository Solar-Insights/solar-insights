import { OrganizationInfosError, OrganizationUserCreationError, OrganizationUserDeletionError } from "@/helpers/alerts/errors";
import { useUserSessionStore } from "@/stores/userSessionStore";
import AxiosInstance from "@/plugins/axios";
import { MyOrganization, MyOrganizationMember } from "@/helpers/types";
import { OrganizationUserCreationSuccess, OrganizationUserDeletionSuccess } from "@/helpers/alerts/success";

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

export async function getMyOrganizationMembers() {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/user/my-organization/members`
    })
        .then((response) => {
            const myOrganizationMembers: MyOrganizationMember[] = response.data.myOrganizationMembers;
            myOrganizationMembers.forEach((member) => {
                member.created_date = cleanIsoStringToKeepYYYYmmdd(member.created_date);
            });
            return response.data.myOrganizationMembers as MyOrganizationMember[];
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationInfosError());
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
            const myOrganizationMember: MyOrganizationMember = response.data.myOrganizationMember;
            myOrganizationMember.created_date = cleanIsoStringToKeepYYYYmmdd(myOrganizationMember.created_date);
            useUserSessionStore().setAlert(new OrganizationUserCreationSuccess());
            return myOrganizationMember;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationUserCreationError());
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
