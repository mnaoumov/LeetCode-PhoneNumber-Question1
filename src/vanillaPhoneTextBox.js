import {validateInput, extractPhoneNumber, formatPhoneNumber} from "./phoneTextBoxUtils.js";

export default function vanillaPhoneTextBox(element) {
    let phoneNumber = "";

    element.addEventListener("beforeinput", e => {
        if (!validateInput(e.data)) {
            e.preventDefault();
        }
    });

    element.addEventListener("input", () => {
        phoneNumber = extractPhoneNumber(element.value);
        element.value = formatPhoneNumber(phoneNumber);
    });
}
