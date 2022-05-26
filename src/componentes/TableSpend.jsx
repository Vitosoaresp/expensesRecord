import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TableSpend.css';

class TableSpend extends React.Component {
  render() {
    const { expenses, deleteExpense, editExpanse } = this.props;
    return (
      <table className="table-expense-container">
        <tr className="table-tr table-trHeader">
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
        }, index) => (
          <tr key={ id } className="table-tr table-body">
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{Number(value).toFixed(2)}</td>
            <td>
              {exchangeRates[currency].name.split('/')[0]}
            </td>
            <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>
              { Number(value * exchangeRates[currency].ask).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                className="btn-edit"
                onClick={ () => editExpanse(expenses[index], index) }
              >
                Editar
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={ () => deleteExpense(id) }
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
  deleteExpense: PropTypes.func.isRequired,
  editExpanse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableSpend);
