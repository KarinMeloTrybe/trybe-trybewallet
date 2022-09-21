import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testa tela de Login', () => {
  test('verifica se o email é validado corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(inputEmail, 'karin');
    userEvent.type(inputPassword, '12');
    expect(submitButton).toBeDisabled();
    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, 'karin@teste.com');
    userEvent.type(inputPassword, '123456');
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);
  });
  test('verifica se o email é validado corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(inputEmail, 'karin@teste.com');
    userEvent.type(inputPassword, '123456');
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);
    expect(history.location.pathname).toBe('/carteira');
  });
});
