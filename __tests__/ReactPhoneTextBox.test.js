/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ReactPhoneTextBox from '../src/ReactPhoneTextBox';
import * as phoneTextBoxUtilsModule from '../src/phoneTextBoxUtils';

let textBox;

function triggerInput() {
  act(() => {
    textBox.dispatchEvent(new InputEvent('input', { bubbles: true }));
  });
}

beforeEach(async () => {
  render(<ReactPhoneTextBox />);
  textBox = await screen.findByRole('textbox');
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('calls validateInput on beforeInput', () => {
  jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.validateInput.name);

  // BUG: https://github.com/facebook/react/issues/11211
  // React dispatchEvent doesn't trigger onBeforeInput listener,
  // that's why we need to trigger it manually in a hacky way
  const reactPropsKey = Object.keys(textBox).find((k) => k.startsWith('__reactProps$'));
  act(() => {
    textBox[reactPropsKey].onBeforeInput(new InputEvent('beforeinput', { data: '1a2b', bubbles: true }));
  });
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

it(
  'sets formattedPhoneNumber from formatPhoneNumber',
  () => {
    jest.spyOn(phoneTextBoxUtilsModule, phoneTextBoxUtilsModule.formatPhoneNumber.name)
      .mockReturnValue('(123) 45');

    triggerInput();

    expect(textBox.value).toBe('(123) 45');
  },
);
