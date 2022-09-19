const INITIAL_STATE = {
  state: '',
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_ACTION':
    return { state: action.state };
  default:
    return state;
  }
}

export default walletReducer;
