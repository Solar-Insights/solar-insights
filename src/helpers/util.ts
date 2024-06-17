import { Locale } from "@/helpers/types";

export function strToLargeNumberDisplay(input: string | number): String {
    let inputStr: string = input.toString().trim();

    // Handles decimal numbers
    let inputStrDecimal: string = "";
    let inputStrSplitted: string[] = inputStr.split(".");
    if (inputStrSplitted.length == 2) {
        inputStr = inputStrSplitted[0];
        inputStrDecimal = "." + inputStrSplitted[1];
    } else if (inputStrSplitted.length >= 2) {
        return inputStr;
    }

    // Handles negative numbers
    let inputStrNegative: string = "";
    if (inputStr.charAt(0) === "-") {
        inputStrNegative = "-";
        inputStr = inputStr.substring(1);
    }

    // Now handles the remaining numbers
    let inputStrTempo: string = "";
    for (let i = 0; i < inputStr.length; i++) {
        inputStrTempo +=
            (inputStr.length - 1 - i) % 3 == 0 && i != inputStr.length - 1
                ? `${inputStr.charAt(i)}\u00A0`
                : inputStr.charAt(i);
    }

    return inputStrNegative + inputStrTempo + inputStrDecimal;
}

export function copyToClipboard(textToCopy: string) {
    if (navigator.clipboard) clipBoardApi(textToCopy);
    else fallbackClipboardExecCommand(textToCopy);
}

function clipBoardApi(textToCopy: string) {
    navigator.clipboard.writeText(textToCopy);
}

function fallbackClipboardExecCommand(textToCopy: string) {
    const textArea = document.createElement("textarea");
    textArea.style.display = "none";
    textArea.value = textToCopy;

    // Avoid scrolling to bottom

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
}

export function priceString(amount: number | string, locale: Locale, rounded: boolean = true) {
    const parsedVal = rounded ? Number(amount).toFixed(2) : Number(amount);

    if (locale === "fr") return `${parsedVal}$`;
    return `$${parsedVal}`;
}

export function userCountSummaryToAlertType(aboveFreeLimit: boolean) {
    if (aboveFreeLimit) return "warning";
    else return "success";
}
