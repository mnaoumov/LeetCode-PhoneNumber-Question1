/**
 * @jest-environment jsdom
 */

import vanillaPhoneTextBox from "../src/vanillaPhoneTextBox.js"
import * as phoneTextBoxUtilsModule from "../src/phoneTextBoxUtils.js"

afterEach(() => {
    jest.restoreAllMocks();
});

it("calls validateInput on beforeInput", () => {
    jest.spyOn(phoneTextBoxUtilsModule, "validateInput");
    const element = document.createElement("input");
    vanillaPhoneTextBox(element);
    element.dispatchEvent(new InputEvent("beforeinput", { data: "1a2b" }));
    expect(phoneTextBoxUtilsModule.validateInput).toHaveBeenCalledWith("1a2b");
});
