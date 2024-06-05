import { FormError } from "@/helpers/alerts/errors";
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
        .then((data) => {
            console.log("sent create organization form successfuly");
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new FormError());
            throw error;
        });
}
