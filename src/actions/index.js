export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const actionLogin = (login) => ({ type: LOGIN, payload: login });
export const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  data: Object.keys(data),
});

export function fetchCurrencies() {
  // const moedas = [];
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(getCurrencies(currencies)));
}