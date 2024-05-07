import { OrganizationError } from "@/helpers/customErrors";
import { useUserSessionStore } from "@/stores/userSessionStore";
import AxiosInstance from "@/plugins/axios";
import { MyOrganization } from "@/helpers/types";

export async function getMyOrganizationInfo() {
    return await AxiosInstance({
        method: "get",
        responseType: "json",
        url: `/user/my-organization`
    })
        .then((response) => {
            return response.data.myOrganization as MyOrganization;
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationError());
            throw error;
        });
}