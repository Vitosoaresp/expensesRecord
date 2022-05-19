import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddExpense } from '../actions';

class FormDespesa extends React.Component {
  state = {
    despesa: 0,
    descricao: '',
    moeda: 'USD',
    metodoPag: 'Dinheiro',
    tag: 'Alimentação',
  }

  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  saveExpanse = () => {
    const { saveExpanse } = this.props;
    saveExpanse({ ...this.state, id: 0 });
  };

  render() {
    const { currencies } = this.props;
    const { despesa, descricao, moeda, metodoPag, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="despesa-valor">
            Valor:
            <input
              type="number"
              name="despesa"
              id="despesa-valor"
              data-testid="value-input"
              onChange={ (e) => this.handleForm(e) }
              value={ despesa }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              name="descricao"
              id="descricao"
              data-testid="description-input"
              onChange={ (e) => this.handleForm(e) }
              value={ descricao }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              name="moeda"
              onChange={ (e) => this.handleForm(e) }
              value={ moeda }
            >
              { currencies.filter((currency) => currency !== 'USDT')
                .map((currency, index) => (
                  <option
                    key={ index }
                    value={ currency }
                  >
                    {currency}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="metodo-pagamento">
            Método de Pagamento:
            <select
              id="metodo-pagamento"
              data-testid="method-input"
              name="metodoPag"
              onChange={ (e) => this.handleForm(e) }
              value={ metodoPag }
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
