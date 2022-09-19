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

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(passUserInformations({ email, password }));
    history.push('/carteira');
  };

  validationUser = () => {
    const tamMin = 6;
    const { email, password } = this.state;
    const validationEmail = email.includes('@', '.com');
    const validationPassword = password.length >= tamMin;
    this.setState({ disabledButton: !(validationEmail && validationPassword) });
  };

  render() {
    const {
      email,
      password,
      disabledButton,
    } = this.state;
    return (
      <div>
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
