export const PASSUSER = 'PASSUSER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const IS_EDITING = 'IS_EDITING';

export const passUserInformations = (user) => ({ type: PASSUSER, value: user });
const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});
const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});
export const updateExpense = (expenses) => ({
  type: UPDATE_EXPENSE,
  expenses,
});
export const isEditing = (id) => ({
  type: IS_EDITING,
  id,
});

export const fetchCurrencies = (expense, type = 'default') => async (dispatch) => {
  try {
    const results = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await results.json();
    if (type === 'save') {
      dispatch(saveExpense({ ...expense, exchangeRates: data }));
    } else {
      dispatch(getCurrencies(data));
    }
  } catch (error) {
    console.log(error);
  }
};
