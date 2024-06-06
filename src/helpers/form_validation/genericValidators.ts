import { ValidationRuleWithParams } from "@vuelidate/core";
import { helpers, maxLength, minLength, email, required } from "@vuelidate/validators";
import { i18n } from "@/plugins/i18n/i18n";

const VALIDATORS_I18N_PREFIX = "validators";

type ValidationMessagePart = {
    value: string,
    isI18n: boolean
};

type ValidationMessageParams = {
    message: ValidationMessagePart[]
};

export function createValidationMessages(validationMessageParams: ValidationMessageParams[]) {
    const listOfValidationMessages = validationMessageParams.map((validationMessageParams) => {
        const validationMessage: string = validationMessageParams.message.reduce((acc, message) => {
            if (message.isI18n) {
                return acc + i18n.global.t(message.value);
            } else {
                return acc + message.value;
            }
        }, "");

        return validationMessage;
    });

    return listOfValidationMessages;
}

export type GeneralValidatorType<T> = {
    [key in keyof T]: {
        [key: string]: ValidationRuleWithParams
    }
}

export function requiredValidator() {
    const validationMessage: ValidationMessageParams = {
        message: [
            {
                value: `${VALIDATORS_I18N_PREFIX}.required`,
                isI18n: true
            }
        ]
    }

    return helpers.withParams(
        validationMessage,
        required
    );
}

export function maxLengthValidator(max: number) {
    const validationMessage: ValidationMessageParams = {
        message: [
            {
                value: `${VALIDATORS_I18N_PREFIX}.max-length`,
                isI18n: true
            },
            {
                value: ` ${max} `,
                isI18n: false
            },
            {
                value: `${VALIDATORS_I18N_PREFIX}.characters-long`,
                isI18n: true
            },
           
        ]
    }

    return helpers.withParams(
        validationMessage,
        maxLength(max)
    );
}

export function minLengthValidator(min: number) {
    const validationMessage: ValidationMessageParams = {
        message: [
            {
                value: `${VALIDATORS_I18N_PREFIX}.min-length`,
                isI18n: true
            },
            {
                value: ` ${min} `,
                isI18n: false
            },
            {
                value: `${VALIDATORS_I18N_PREFIX}.characters-long`,
                isI18n: true
            },
           
        ]
    }

    return helpers.withParams(
        validationMessage,
        minLength(min)
    );
}

export function isEmailValidator() {
    const validationMessage: ValidationMessageParams = {
        message: [
            {
                value: `${VALIDATORS_I18N_PREFIX}.email`,
                isI18n: true
            }
        ]
    }

    return helpers.withParams(
        validationMessage,
        email
    );
}

function containsLetter(value: string) {
    return /[A-Z]/.test(value) || /[a-z]/.test(value);
}

function containsNumber(value: string) {
    return /[0-9]/.test(value);
}