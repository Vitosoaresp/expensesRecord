import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import Header from '../componentes/Header';

class Wallet extends React.Component {
  async componentDidMount() {
    const { getCurrency } = this.props;
    const currency = await getCurrency();
    currency.data.splice(1, 1);
  }

  render() {
    return (
      <>
        <Header />
        <div />
      </>
    );
  }
}

Wallet.propTypes = {
  getCurrency: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
