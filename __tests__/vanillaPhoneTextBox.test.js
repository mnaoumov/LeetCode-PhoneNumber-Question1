/**
 * @jest-environment jsdom
 */

import vanillaPhoneTextBox from '../src/vanillaPhoneTextBox';
import * as phoneTextBoxUtilsModule from '../src/phoneTextBoxUtils';

let textBox;

function triggerInput() {
  textBox.dispatchEvent(new InputEvent('input'));
}

beforeEach(() => {
  textBox = document.createElement('input');
  vanillaPhoneTextBox(textBox);
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('calls validateInput on beforeInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, 'validateInput');
  textBox.dispatchEvent(new InputEvent('beforeinput', { data: '1a2b' }));
  expect(phoneTextBoxUtilsModule.validateInput).toBeCalledWith('1a2b');
});

it('calls extractPhoneNumber on input', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.extractPhoneNumber.name);
  textBox.value = '3c4d';
  triggerInput();
  expect(phoneTextBoxUtilsModule.extractPhoneNumber).toBeCalledWith('3c4d');
});

it('calls formatPhoneNumber on input', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.formatPhoneNumber.name);
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.extractPhoneNumber.name).mockReturnValue('5e6f');
  triggerInput();
  expect(phoneTextBoxUtilsModule.formatPhoneNumber).toBeCalledWith('5e6f');
});

it('sets formattedPhoneNumber from formatPhoneNumber', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.formatPhoneNumber.name)
    .mockImplementation(() => '(123) 45');
  triggerInput();
  expect(textBox.value).toBe('(123) 45');
});
