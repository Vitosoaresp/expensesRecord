import { WALLET } from '../redux/actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      action,
    };
  default:
    return state;
  }
}

export default wallet;
