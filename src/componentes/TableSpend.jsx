import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteExpense } from '../actions';

class TableSpend extends React.Component {
  deleteExpense = (id) => {
    const { delExpense } = this.props;
    delExpense(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses && expenses.map(({
          description,
          id,
          value,
          currency,
          tag,
          method,
          exchangeRates,
        }) => (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{Number(value).toFixed(2)}</td>
            <td>
              {exchangeRates[currency].name}
            </td>
            <td>{currency}</td>
            <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>
              { Number(value * exchangeRates[currency].ask).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.deleteExpense(id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

TableSpend.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  delExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  delExpense: (id) => dispatch(actionDeleteExpense(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(TableSpend);
