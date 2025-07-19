import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { createRef } from 'react';
import { SignUpFields } from './SignUpFields';
import { act } from '@testing-library/react';

test('CheckFields returns false for short name', async () => {
  const ref = createRef<{ CheckFields: () => boolean }>();
  render(<SignUpFields ref={ref} onChange={() => {}} />);

  const nameInput = screen.getByPlaceholderText(/full name/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);

  await userEvent.type(nameInput, 'A'); // שם קצר מדי
  await userEvent.type(passwordInput, 'validpass123'); // סיסמה תקינה
  await userEvent.type(phoneInput, '0535510999'); // טלפון תקין

  let result;
  act(() => {
    result = ref.current?.CheckFields();
  });

  expect(result).toBe(false);
});

test('CheckFields returns false for short password', async () => {
  const ref = createRef<{ CheckFields: () => boolean }>();
  render(<SignUpFields ref={ref} onChange={() => {}} />);

  const nameInput = screen.getByPlaceholderText(/full name/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);

  await userEvent.type(nameInput, 'Valid Name'); // שם תקין
  await userEvent.type(passwordInput, 'short'); // סיסמה קצרה מדי
  await userEvent.type(phoneInput, '0535510999'); // טלפון תקין

  let result;
  act(() => {
    result = ref.current?.CheckFields();
  });

  expect(result).toBe(false);
});

test('CheckFields returns false for invalid phone number', async () => {
  const ref = createRef<{ CheckFields: () => boolean }>();
  render(<SignUpFields ref={ref} onChange={() => {}} />);

  const nameInput = screen.getByPlaceholderText(/full name/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);

  await userEvent.type(nameInput, 'Valid Name'); // שם תקין
  await userEvent.type(passwordInput, 'validpass123'); // סיסמה תקינה
  await userEvent.type(phoneInput, '12345'); // טלפון לא תקין (לא 10 תווים, לא מתחיל ב-0)

  let result;
  act(() => {
    result = ref.current?.CheckFields();
  });

  expect(result).toBe(false);
});

test('CheckFields returns false for empty fields', async () => {
  const ref = createRef<{ CheckFields: () => boolean }>();
  render(<SignUpFields ref={ref} onChange={() => {}} />);

  const nameInput = screen.getByPlaceholderText(/full name/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);

  // אין צורך להקליד כלום - שדות ריקים כבר בהתחלה

  let result;
  act(() => {
    result = ref.current?.CheckFields();
  });

  expect(result).toBe(false);
});

test('CheckFields returns true for valid inputs', async () => {
  const ref = createRef<{ CheckFields: () => boolean }>();
  render(<SignUpFields ref={ref} onChange={() => {}} />);

  const nameInput = screen.getByPlaceholderText(/full name/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);

  await userEvent.type(nameInput, 'Eilay Levi'); // שם תקין (> 3 תווים)
  await userEvent.type(passwordInput, 'longenoughpassword'); // סיסמה תקינה (>=9 תווים)
  await userEvent.type(phoneInput, '0535510999'); // מספר טלפון תקין (10 תווים, מתחיל ב-0)

  let result;
  act(() => {
    result = ref.current?.CheckFields();
  });

  expect(result).toBe(true);
});


test('CheckFields returns false for name with only spaces', async () => {
  const ref = createRef<{ CheckFields: () => boolean }>();
  render(<SignUpFields ref={ref} onChange={() => {}} />);

  const nameInput = screen.getByPlaceholderText(/full name/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);

  await userEvent.type(nameInput, '   '); // שם עם רווחים בלבד
  await userEvent.type(passwordInput, 'validpass123'); 
  await userEvent.type(phoneInput, '0535510999');

  let result;
  act(() => {
    result = ref.current?.CheckFields();
  });

  expect(result).toBe(false);
});
