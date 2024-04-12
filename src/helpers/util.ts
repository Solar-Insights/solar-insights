/* String manipulation */
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
