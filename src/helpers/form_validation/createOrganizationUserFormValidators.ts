import { NewOrganizationUserForm } from "@/helpers/types";
import { GeneralValidatorType, requiredValidator, isEmailValidator, maxLengthValidator } from "@/helpers/form_validation/genericValidators";
import { NAME_MAX_LENGTH, EMAIL_MAX_LENGTH, ADDITIONAL_NOTES_MAX_LENGTH } from "@/helpers/form_validation/constants";

export const newOrganizationUserFormValidators: GeneralValidatorType<NewOrganizationUserForm> = {
    email: {
        maxLength: maxLengthValidator(EMAIL_MAX_LENGTH),
        required: requiredValidator(),
        email: isEmailValidator()
    },
    name: {
        maxLength: maxLengthValidator(NAME_MAX_LENGTH),
        required: requiredValidator()
    }
}