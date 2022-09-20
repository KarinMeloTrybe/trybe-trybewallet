import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      email,
      expenses,
    } = this.props;
    const soma = expenses.reduce((acc, crr) => {
      let total = acc;
      total += parseFloat(crr.value) * crr.exchangeRates[crr.currency].ask;
      return total;
    }, 0);
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p
          name="Despesa Total"
          data-testid="total-field"
        >
          {soma.toFixed(2)}

        </p>
        <p name="BRL" data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
