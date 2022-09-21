import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWith from './helpers/renderWith';
import globalState from './helpers/InitialState';

const idValue = 'value-input';
const idDescription = 'description-input';
describe('Testa página da carteira', () => {
  test('verifica se os campos requisitados estão renderizados na page ', () => {
    renderWith(<App />, { initialEntries: ['/carteira'], initialState: globalState });
    const value = screen.getByTestId(idValue);
    const descriptionField = screen.getByTestId(idDescription);
    const emailField = screen.getByTestId('email-field');
    const currency = screen.getByTestId('header-currency-field');
    expect(emailField).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
  });
  test('verifica se as despesas são adicionadas e excluídas na page, corretamente ', async () => {
    renderWith(<App />, { initialEntries: ['/carteira'], initialState: globalState });
    const value = screen.getByTestId(idValue);
    const descriptionField = screen.getByTestId(idDescription);
    const btnExpense = screen.getByTestId('btn-expense');
    userEvent.type(value, '1200');
    userEvent.type(descriptionField, 'viagem');
    userEvent.click(btnExpense);
    const expenseDescription = await waitFor(() => screen.getByTestId('description-field'));
    expect(expenseDescription).toBeInTheDocument();
    expect(expenseDescription.textContent).toBe('viagem');
    const btnDelet = screen.getByTestId('delete-btn');
    userEvent.click(btnDelet);
    expect(expenseDescription).not.toBeInTheDocument();
  });
  test('verifica se as despesas podem ser editadas corretamente ', async () => {
    renderWith(<App />, { initialEntries: ['/carteira'], initialState: globalState });
    const value = screen.getByTestId(idValue);
    const descriptionField = screen.getByTestId(idDescription);
    const btnExpense = screen.getByTestId('btn-expense');
    userEvent.type(value, '1200');
    userEvent.type(descriptionField, 'viagem');
    userEvent.click(btnExpense);
    const expenseDescription = await waitFor(() => screen.getByTestId('description-field'));
    const editBtn = screen.getByTestId('edit-btn');
    userEvent.click(editBtn);
    userEvent.clear(descriptionField);
    userEvent.type(descriptionField, 'mercado');
    userEvent.click(btnExpense);
    expect(expenseDescription.textContent).toBe('mercado');
  });
});
