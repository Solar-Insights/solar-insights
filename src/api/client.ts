import { OrganizationError } from "@/helpers/customErrors";
import { NewOrganizationForm } from "@/helpers/types";
import AxiosInstance from "@/plugins/axios";
import { useUserSessionStore } from "@/stores/userSessionStore";

export async function postCreateOrganizationForm(form: NewOrganizationForm) {
    return await AxiosInstance({
        method: "post",
        responseType: "json",
        url: `/unsecured/organization`,
        data: form
    })
        .catch((error) => {
            useUserSessionStore().setAlert(new OrganizationError());
            throw error;
        });
}
