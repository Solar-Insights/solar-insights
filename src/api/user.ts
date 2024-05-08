import { OrganizationError } from "@/helpers/customErrors";
import { useUserSessionStore } from "@/stores/userSessionStore";
import AxiosInstance from "@/plugins/axios";
import { MyOrganization, UserData } from "@/helpers/types";

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

export async function createUserForOrganization(email: string, name: string) {
    console.log("created user");
    return {};
}

export async function deleteUserFromOrganization(user: UserData) {
    console.log("deleted user");
    return {};
}
