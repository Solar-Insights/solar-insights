import { NewOrganizationForm } from "@/helpers/types";
import { GeneralValidatorType, requiredValidator, isEmailValidator, maxLengthValidator } from "@/helpers/form_validation/genericValidators";

export const NAME_MAX_LENGTH = 256;
export const EMAIL_MAX_LENGTH = 256;
export const ADDITIONAL_NOTES_MAX_LENGTH = 1024;

export const newOrganizationFormValidators: GeneralValidatorType<NewOrganizationForm> = {
    name: {
        maxLength: maxLengthValidator(NAME_MAX_LENGTH),
        required: requiredValidator()
    },
    contactEmail: {
        maxLength: maxLengthValidator(EMAIL_MAX_LENGTH),
        required: requiredValidator(),
        email: isEmailValidator()
    },
    pricingTier: {
        required: requiredValidator()
    },
    additionalNotes: {
        maxLength: maxLengthValidator(ADDITIONAL_NOTES_MAX_LENGTH),
    }
}