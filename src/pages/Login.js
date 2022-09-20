import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { passUserInformations } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
  };

  handleChange = (event) => {
    const userName = event.target.name;
    const userValue = event.target.value;
    this.setState({ [userName]: userValue }, this.validationUser);
  };

  handleClick = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(passUserInformations(email));
    history.push('/carteira');
  };

  validationUser = () => {
    const tamMin = 6;
    const { email, password } = this.state;
    const emailValidation = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const validation = [
      password.length >= tamMin,
      email.length > 0,
      emailValidation.test(email),
    ];
    if (validation.every((item) => item === true)) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  render() {
    const {
      email,
      password,
      disabledButton,
    } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="#">
            Email
            <input
              type="email"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="#">
            <input
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ disabledButton }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
