import { validateInput, extractPhoneNumber, formatPhoneNumber } from './phoneTextBoxUtils';

export default function vanillaPhoneTextBox(element) {
  element.addEventListener('beforeinput', (e) => {
    if (!validateInput(e.data)) {
      e.preventDefault();
    }
  });

  element.addEventListener('input', () => {
    const phoneNumber = extractPhoneNumber(element.value);
    Object.assign(element, {
      value: formatPhoneNumber(phoneNumber),
    });
  });
}
