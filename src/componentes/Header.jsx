import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  getExpenses = () => {
    const { getExpenses } = this.props;
    if (getExpenses.length === 0) return 0;
    const sum = getExpenses
      .map(({
        value,
        currency,
        exchangeRates,
      }) => Number(value) * Number(exchangeRates[currency].ask))
      .reduce((acc, cur) => acc + cur);
    return sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="user-info">
          User:
          <span data-testid="email-field">
            { email }
          </span>
        </div>
        <div className="user-cash">
          Despesa Total:
          <span data-testid="total-field">{this.getExpenses()}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  getExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
