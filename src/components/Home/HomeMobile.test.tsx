import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './Home';

jest.mock('@/context/ScreenSizesProvider', () => ({
  useScreenWidth: () => 500
}));

test('should show error when email is invalid', async () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  const emailInput = screen.getByPlaceholderText(/work email/i);
  await userEvent.type(emailInput, 'hi');

  const submitButton = screen.getByRole('button', { name: /get started/i });
  await userEvent.click(submitButton);

  const errorMessage = await screen.findByText(/please enter a valid email/i);
  expect(errorMessage).toBeInTheDocument();
});


test('email is valid and submit button is enabled', async () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  const emailInput = screen.getByPlaceholderText(/work email/i);
  await userEvent.type(emailInput, 'eilaylevi95@gmail.com'); //can u contact me at this email

  const submitButton = screen.getByRole('button', { name: /get started/i });
  await userEvent.click(submitButton);
  
  expect(submitButton).toBeEnabled();
});



test('email includes only a@.com', async () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  const emailInput = screen.getByPlaceholderText(/work email/i);
  await userEvent.type(emailInput, 'a@.com');

  const submitButton = screen.getByRole('button', { name: /get started/i });
  await userEvent.click(submitButton);
  
  const errorMessage = await screen.findByText(/please enter a valid email/i);
  expect(errorMessage).toBeInTheDocument();
});


test('email includes only @a.com', async () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  const emailInput = screen.getByPlaceholderText(/work email/i);
  await userEvent.type(emailInput, '@a.com');

  const submitButton = screen.getByRole('button', { name: /get started/i });
  await userEvent.click(submitButton);
  
  const errorMessage = await screen.findByText(/please enter a valid email/i);
  expect(errorMessage).toBeInTheDocument();
});
