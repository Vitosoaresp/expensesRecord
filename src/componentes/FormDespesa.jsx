import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormDespesa extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="despesa-valor">
            Valor:
            <input
              type="number"
              name="despesa-valor"
              id="despesa-valor"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              name="descricao"
              id="descricao"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select id="moeda">
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
            <select id="metodo-pagamento" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select id="tag" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>

            </select>
          </label>
        </form>
      </div>
    );
  }
}

FormDespesa.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(FormDespesa);
