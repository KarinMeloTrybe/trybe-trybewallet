import { PASSUSER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PASSUSER:
    return { ...state, email: action.value };
  default:
    return state;
  }
}

export default userReducer;
