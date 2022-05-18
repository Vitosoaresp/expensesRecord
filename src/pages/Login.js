import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
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
    const { senha, email } = this.state;
    const checkEmail = this.IsEmail(email);
    const REQUIRE_LENGTH = 6;
    if (senha.length < REQUIRE_LENGTH === false && checkEmail === false) {
      check = false;
    }
    this.setState({ isDisabled: check });
  };

  clickEnter = (e) => {
    e.preventDefault();
    const { history, setUser } = this.props;
    const { email, senha } = this.state;
    setUser({ email, senha });
    history.push('/carteira');
  }

  render() {
    const { email, senha, isDisabled } = this.state;
    return (
      <div>
        Login
        <form>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            required
            onChange={ (e) => this.handleForm(e) }
            onKeyUp={ () => this.verifyLogin() }
          />
          <input
            type="password"
            data-testid="password-input"
            name="senha"
            value={ senha }
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
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
