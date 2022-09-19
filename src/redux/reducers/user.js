import { PASSUSER } from '../actions';

const INITIAL_STATE = {
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PASSUSER:
    return action.value;
  default:
    return state;
  }
}

export default userReducer;
