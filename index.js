import {
  validateInput,
  extractPhoneNumber,
  formatPhoneNumber
} from "./phoneTextBox.js";

const phoneTextBox = document.getElementById("phone");

let phoneNumber = "";

phoneTextBox.addEventListener("beforeinput", e => {
  if (!validateInput(e.data)) {
    e.preventDefault();
  }
});

phoneTextBox.addEventListener("input", () => {
  phoneNumber = extractPhoneNumber(phoneTextBox.value);
  phoneTextBox.value = formatPhoneNumber(phoneNumber);
});
