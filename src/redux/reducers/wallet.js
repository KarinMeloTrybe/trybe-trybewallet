import { UPDATE_EXPENSE, GET_CURRENCIES, IS_EDITING, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((key) => key !== 'USDT'),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: action.expenses,
    };
  case IS_EDITING:
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  default:
    return state;
  }
}

export default walletReducer;
