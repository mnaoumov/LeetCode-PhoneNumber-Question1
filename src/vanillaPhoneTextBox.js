const MAX_PHONE_LENGTH = 10;

const validateInput = (inputData) => /^\d*$/.test(inputData ?? "");

const extractPhoneNumber = (formattedPhoneNumber) =>
    formattedPhoneNumber.replace(/\D/g, "").substring(0, MAX_PHONE_LENGTH);

const formatPhoneNumber = (phoneNumber) => {
    const length = phoneNumber.length;
    const PART1_INDEX = 3;
    const PART2_INDEX = 6;

    const code = phoneNumber.substring(0, PART1_INDEX);
    const part1 = phoneNumber.substring(PART1_INDEX, PART2_INDEX);
    const part2 = phoneNumber.substring(PART2_INDEX, MAX_PHONE_LENGTH);

    if (length <= PART1_INDEX) {
        return code;
    }

    if (length <= PART2_INDEX) {
        return `(${code}) ${part1}`;
    }

    return `(${code}) ${part1}-${part2}`;
};

function vanillaPhoneTextBox(element) {
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

export default vanillaPhoneTextBox;
export { validateInput, extractPhoneNumber, formatPhoneNumber };
