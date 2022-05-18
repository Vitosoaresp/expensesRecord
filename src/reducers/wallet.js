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
      ...action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
