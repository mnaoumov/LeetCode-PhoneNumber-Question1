/**
 * @jest-environment jsdom
 */

import vanillaPhoneTextBox from '../src/vanillaPhoneTextBox';
import * as phoneTextBoxUtilsModule from '../src/phoneTextBoxUtils';

let element;

beforeEach(() => {
  element = document.createElement('input');
  vanillaPhoneTextBox(element);
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('calls validateInput on beforeInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, 'validateInput');
  element.dispatchEvent(new InputEvent('beforeinput', { data: '1a2b' }));
  expect(phoneTextBoxUtilsModule.validateInput).toHaveBeenCalledWith('1a2b');
});

it('calls extractPhoneNumber on input', () => {
  jest.spyOn(phoneTextBoxUtilsModule, 'extractPhoneNumber');
  element.value = '3c4d';
  element.dispatchEvent(new InputEvent('input'));
  expect(phoneTextBoxUtilsModule.extractPhoneNumber).toHaveBeenCalledWith('3c4d');
});

it('calls formatPhoneNumber on input', () => {
  jest.spyOn(phoneTextBoxUtilsModule, 'formatPhoneNumber');
  jest.spyOn(phoneTextBoxUtilsModule, 'extractPhoneNumber').mockReturnValue('5e6f');
  element.dispatchEvent(new InputEvent('input'));
  expect(phoneTextBoxUtilsModule.formatPhoneNumber).toHaveBeenCalledWith('5e6f');
});

it('sets formattedPhoneNumber from formatPhoneNumber', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.formatPhoneNumber.name)
    .mockImplementation(() => "(123) 45");

  element.dispatchEvent(new InputEvent('input'));

  expect(element.value).toBe('(123) 45');
});
