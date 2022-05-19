import { GET_CURRENCIES, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.data,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense }],
    };
  default:
    return state;
  }
}

export default wallet;
