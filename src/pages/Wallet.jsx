import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';
import FormDespesa from '../componentes/FormDespesa';

class Wallet extends React.Component {
  async componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    return (
      <FormDespesa />
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
