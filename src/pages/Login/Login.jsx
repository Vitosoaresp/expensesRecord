import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin, fetchCurrencies } from '../../redux/actions';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      isDisabled: true,
    };
  }

  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  IsEmail = (email) => {
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const re = /\S+@\S+\.\S+/;
    return !re.test(email);
  };

  verifyLogin = () => {
    let check = true;
    const { email } = this.state;
    const checkEmail = this.IsEmail(email);
    if (checkEmail === false) {
      check = false;
    }
    this.setState({ isDisabled: check });
  };

  clickEnter = (e) => {
    e.preventDefault();
    const { history, setUser } = this.props;
    const { email } = this.state;
    setUser({ email });
    history.push('/carteira');
  }

  render() {
    const { email, isDisabled } = this.state;
    return (
      <div className="login-container">
        <h1>LOGIN</h1>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ (e) => this.handleForm(e) }
            onKeyUp={ () => this.verifyLogin() }
          />
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ (e) => this.clickEnter(e) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(actionLogin(user)),
  getCurrency: () => dispatch(fetchCurrencies()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
