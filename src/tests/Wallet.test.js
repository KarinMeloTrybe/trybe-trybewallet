import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWith from './helpers/renderWith';
import globalState from './helpers/InitialState';

const idValue = 'value-input';
const idDescription = 'description-input';
const idDescriptionField = 'description-field';
const idValueField = 'value-field';
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

    await waitFor(() => {
      expect(screen.getByTestId(idDescriptionField)).toBeInTheDocument();
    });
    const expenseDescription = screen.getByTestId(idDescriptionField);
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

    userEvent.clear(descriptionField);
    userEvent.clear(value);

    userEvent.type(value, '120');
    userEvent.type(descriptionField, 'internet');
    userEvent.click(btnExpense);

    await waitFor(() => {
      expect(screen.getAllByTestId(idDescriptionField)[1]).toHaveTextContent('internet');
    });

    const expenseDescription = screen.getAllByTestId(idDescriptionField);
    const expenseValue = screen.getAllByTestId(idValueField);
    const editBtn = screen.getAllByTestId('edit-btn');

    userEvent.click(editBtn[0]);
    userEvent.clear(descriptionField);
    userEvent.clear(value);
    userEvent.type(descriptionField, 'mercado');
    userEvent.type(value, '900');
    userEvent.click(btnExpense);

    expect(expenseDescription[0]).toHaveTextContent('mercado');
    expect(expenseValue[0]).toHaveTextContent('900');
  });
});
