import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const {
      inputDescription,
      inputValue,
      inputCurrency,
      inputMethod,
      inputTag,
      handleChange,
      currencies,
      handleClick,
      editor,
    } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="inputValue">
            Valor
            <input
              value={ inputValue }
              id="inputValue"
              data-testid="value-input"
              placeholder="Digite o valor da despesa"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="inputDescription">
            Descrição
            <input
              value={ inputDescription }
              id="inputDescription"
              data-testid="description-input"
              placeholder="Descrição da despesa"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="inputCurrency">
            Moeda
            <select
              value={ inputCurrency }
              id="inputCurrency"
              data-testid="currency-input"
              onChange={ handleChange }
            >
              {currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{ currency }</option>
              ))}
            </select>
          </label>
          <label htmlFor="inputMethod">
            Método de pagamento
            <select
              value={ inputMethod }
              id="inputMethod"
              data-testid="method-input"
              onChange={ handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="inputTag">
            Categoria
            <select
              value={ inputTag }
              id="inputTag"
              data-testid="tag-input"
              onChange={ handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            onClick={ handleClick }
            type="submit"
          >
            { editor ? 'Editar despesas' : ' Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  idToEdit: wallet.idToEdit,
  editor: wallet.editor,
});

WalletForm.propTypes = {
  inputDescription: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputCurrency: PropTypes.string.isRequired,
  inputMethod: PropTypes.string.isRequired,
  inputTag: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
