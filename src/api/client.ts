import { FormError } from "@/helpers/alerts/errors";
import { CreateOrganizationFormSuccess } from "@/helpers/alerts/success";
import { NewOrganizationForm } from "@/helpers/types";
import AxiosInstance from "@/api/axios";
import { useUserSessionStore } from "@/stores/userSessionStore";

export async function postCreateOrganizationForm(form: NewOrganizationForm) {
    return await AxiosInstance({
        method: "post",
        responseType: "json",
        url: `/unsecured/organization`,
        data: form
    })
        .then((data) => {
            useUserSessionStore().setAlert(new CreateOrganizationFormSuccess());
        })
        .catch((error) => {
            useUserSessionStore().setAlert(new FormError());
            throw error;
        });
}
