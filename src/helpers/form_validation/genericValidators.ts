import { ValidationRuleWithParams } from "@vuelidate/core";
import { helpers, maxLength, minLength, email, required } from "@vuelidate/validators";
import { i18n } from "@/plugins/i18n/i18n";

export type GeneralValidator<T> = {
    [key in keyof T]: {
        [key: string]: ValidationRuleWithParams
    }
}

export function requiredValidator() {
    return helpers.withMessage(i18n.global.t("validators.required"), required);
}

export function maxLengthValidator(max: number) {
    const message = `${i18n.global.t("validators.max-length")} ${max} ${i18n.global.t("validators.characters-long")}`;
    return helpers.withMessage(message, maxLength(max))
}

export function minLengthValidator(min: number) {
    const message = `${i18n.global.t("validators.min-length")} ${min} ${i18n.global.t("validators.characters-long")}`;
    return helpers.withMessage(message, minLength(min));
}

export function isEmailValidator() {
    return helpers.withMessage(i18n.global.t("validators.email"), email)
}

export function containsLetter(value: string) {
    return /[A-Z]/.test(value) || /[a-z]/.test(value);
}

export function containsNumber(value: string) {
    return /[0-9]/.test(value);
}

export function hasCorrectNumberOfElements(value: number) {
    return value <= 3 && value >= 0;
}

export function isValidType(value: string) {
    return ["Image", "Paragraphe"].includes(value);
}

export function isValidNewsletter(value: string) {
    return ["Articles", "Recettes"].includes(value);
}