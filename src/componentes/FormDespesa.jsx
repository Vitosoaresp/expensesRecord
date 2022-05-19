import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddExpense } from '../actions';
import TableSpend from './TableSpend';

class FormDespesa extends React.Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
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

  saveExpanse = async () => {
    const { saveExpanse } = this.props;
    const currencies = await this.fecthPrices();
    saveExpanse({ ...this.state, exchangeRates: currencies });
    this.setState(({ id }) => this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
    }));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
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
          <button
            type="button"
            onClick={ () => this.saveExpanse() }
          >
            Adicionar despesa
          </button>
        </form>
        <div>
          <TableSpend />
        </div>
      </div>
    );
  }
}

FormDespesa.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpanse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpanse: (expanse) => dispatch(actionAddExpense(expanse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
