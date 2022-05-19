export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const actionLogin = (login) => ({ type: LOGIN, payload: login });
export const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  data: Object.keys(data),
});
export const actionAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(getCurrencies(currencies)));
}
