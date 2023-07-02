import {
    validateInput,
    extractPhoneNumber,
    formatPhoneNumber
} from "../src/vanillaPhoneTextBox.js";

describe("validateInput", () => {
    test("Returns true for empty input", () => {
        expect(validateInput("")).toBe(true);
    });

    test("Returns true for null input", () => {
        expect(validateInput(null)).toBe(true);
    });

    test("Returns true for single digits", () => {
        for (const inputData of ["0", "5", "9"]) {
            expect(validateInput(inputData)).toBe(true);
        }
    });

    test("Returns false for non-digits", () => {
        for (const inputData of ["A", "a", "Z", "z", ".", "/"]) {
            expect(validateInput(inputData)).toBe(false);
        }
    });

    test("Returns true for multi-digit strings", () => {
        for (const inputData of ["12", "123", "1234567890"]) {
            expect(validateInput(inputData)).toBe(true);
        }
    });

    test("Returns true for strings that contain non-digits", () => {
        for (const inputData of ["12a", "12.3", "12345b67890"]) {
            expect(validateInput(inputData)).toBe(false);
        }
    });

    test("Returns true for long multi-digit strings", () => {
        expect(validateInput("123456789012345678901234567890")).toBe(true);
    });
});

describe("extractPhoneNumber", () => {
    test("Removes non-digits", () => {
        expect(extractPhoneNumber("1A2a3Z4a5.6/7-8,9@0#$")).toBe("1234567890");
    });

    test("Trims too long strings", () => {
        expect(extractPhoneNumber("12345678901234567890")).toBe("1234567890");
    });
});

describe("formatPhoneNumber", () => {
    it("Returns empty for empty", () => {
        expect(formatPhoneNumber("")).toBe("");
    });

    it("Returns code for short numbers", () => {
        expect(formatPhoneNumber("1")).toBe("1");
        expect(formatPhoneNumber("12")).toBe("12");
        expect(formatPhoneNumber("123")).toBe("123");
    });

    it("Wraps code with parentheses", () => {
        expect(formatPhoneNumber("1234")).toBe("(123) 4");
        expect(formatPhoneNumber("12345")).toBe("(123) 45");
        expect(formatPhoneNumber("123456")).toBe("(123) 456");
    });

    it("Adds hyphen between parts", () => {
        expect(formatPhoneNumber("1234567")).toBe("(123) 456-7");
        expect(formatPhoneNumber("12345678")).toBe("(123) 456-78");
        expect(formatPhoneNumber("123456789")).toBe("(123) 456-789");
        expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
    });
});
