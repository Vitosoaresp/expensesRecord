import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiWalletAlt, BiUserCircle } from 'react-icons/bi';
import { actionAddExpense, actionDeleteExpense, actionEditExpense } from '../redux/actions';
import TableSpend from './TableSpend';
import './FormDespesa.css';

class FormDespesa extends React.Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    isEditingMode: false,
    expenseSelect: '',
    expenseSelectPosition: 0,
  }

  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  fecthPrices = async () => {
    const currenciesApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await currenciesApi.json();
    return result;
  };

  deleteExpense = (idExpense) => {
    const { delExpense } = this.props;
    delExpense(idExpense);
    this.setState(({ id }) => this.setState({ id: id - 1 }));
  };

  saveExpanse = async () => {
    const { value, description, currency, method, tag, id } = this.state;
    const { saveExpanse } = this.props;
    const currencies = await this.fecthPrices();
    saveExpanse({
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates: currencies });
    this.setState((prevState) => this.setState({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro' }));
  };

  setEditExpense = () => {
    const { editExpense, expenses } = this.props;
    const { expenseSelect, expenseSelectPosition, value, description, currency, method,
      tag } = this.state;
    const expanseEdited = { ...expenseSelect, value, description, currency, method, tag };
    editExpense(expanseEdited, expenseSelectPosition, expenses);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      expenseSelect: '',
      expenseSelectPosition: 0,
      isEditingMode: false,
    });
  };

  editExpense = (expense, position) => {
    const { value, description, currency, method, tag } = expense;
    this.setState({
      isEditingMode: true,
      expenseSelect: expense,
      expenseSelectPosition: position,
      value,
      description,
      currency,
      method,
      tag });
  };

  getSumExpenses = (expenses) => {
    if (expenses.length === 0) return 0;
    const sum = expenses
      .map(({ value, currency, exchangeRates }) => (
        Number(value) * Number(exchangeRates[currency].ask)))
      .reduce((acc, cur) => acc + cur);
    return sum.toFixed(2);
  };

  render() {
    const { currencies, email, expenses } = this.props;
    const { value, description, currency, method, tag, isEditingMode } = this.state;
    return (
      <div>
        <header className="header">
          <div className="wallet-svg"><BiWalletAlt /></div>
          <div className="user">
            <div className="user-info">
              <BiUserCircle className="user-svg" />
              <span data-testid="email-field">
                { email }
              </span>
            </div>
            <div className="user-cash">
              Despesa Total: R$
              <span data-testid="total-field">{this.getSumExpenses(expenses)}</span>
              <span data-testid="header-currency-field">BRL</span>
            </div>
          </div>
        </header>
        <form className="form-container">
          <label htmlFor="despesa-valor">
            Valor:
            <input
              type="number"
              name="value"
              id="despesa-valor"
              data-testid="value-input"
              onChange={ (e) => this.handleForm(e) }
              value={ value }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              name="description"
              id="descricao"
              data-testid="description-input"
              onChange={ (e) => this.handleForm(e) }
              value={ description }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              name="currency"
              data-testid="currency-input"
              onChange={ (e) => this.handleForm(e) }
              value={ currency }
            >
              { currencies.filter((currenci) => currenci !== 'USDT')
                .map((currenci, index) => (
                  <option
                    key={ index }
                    value={ currenci }
                  >
                    {currenci}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="metodo-pagamento">
            Método de Pagamento:
            <select
              id="metodo-pagamento"
              data-testid="method-input"
              name="method"
              onChange={ (e) => this.handleForm(e) }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              onChange={ (e) => this.handleForm(e) }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <div>
            { isEditingMode ? (
              <button type="button" onClick={ () => this.setEditExpense() }>
                Editar despesa
              </button>
            ) : (
              <button type="button" onClick={ () => this.saveExpanse() }>
                Adicionar despesa
              </button>
            )}
          </div>
        </form>
        <div>
          <TableSpend
            deleteExpense={ this.deleteExpense }
            isEditingMode={ isEditingMode }
            editExpanse={ this.editExpense }
          />
        </div>
      </div>
    );
  }
}

FormDespesa.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpanse: PropTypes.func.isRequired,
  delExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  email: state.user.email });

const mapDispatchToProps = (dispatch) => ({
  saveExpanse: (expanse) => dispatch(actionAddExpense(expanse)),
  delExpense: (id) => dispatch(actionDeleteExpense(id)),
  editExpense: (newExpense, position, expenses) => dispatch(
    actionEditExpense(newExpense, position, expenses),
  ) });

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
