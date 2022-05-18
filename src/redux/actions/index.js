export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';

export const actionLogin = (login) => ({ type: LOGIN, payload: login });
export const actionWallet = (data) => ({ type: LOGIN, paylaod: data });
