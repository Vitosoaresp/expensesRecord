export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const actionLogin = (login) => ({ type: LOGIN, payload: login });

export const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  data: Object.keys(data),
});

export const actionAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const actionDeleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  payload: expense,
});

export const actionEditExpense = (newExpense, position, expenses) => {
  expenses[position] = newExpense;
  return ({
    type: EDIT_EXPENSE,
    payload: expenses,
  });
};

export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      const Newcurrencies = {...currencies, BRL: {
        "code": "BRL",
        "codein": "BRL",
        "name": "Real Brasileiro",
        "ask": "1",
      }, };
      dispatch(getCurrencies(Newcurrencies));});
}
