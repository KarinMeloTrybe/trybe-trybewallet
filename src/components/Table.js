import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpense } from '../redux/actions';

class Table extends Component {
  deleteButton = (event) => {
    event.preventDefault();
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses
      .filter((expense) => Number(expense.id) !== Number(event.target.id));
    dispatch(updateExpense(newExpenses));
  };

  render() {
    const { expenses, editButton, editor } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
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
          </thead>
          <tbody>
            { expenses.length > 0 && expenses.map((expense) => {
              const total = expense.value * expense.exchangeRates[expense.currency].ask;
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{parseFloat(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {parseFloat(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>{parseFloat(total).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      id={ expense.id }
                      data-testid="edit-btn"
                      type="submit"
                      onClick={ editButton }
                      disabled={ editor }
                    >
                      Editar
                    </button>
                    <button
                      id={ expense.id }
                      data-testid="delete-btn"
                      type="submit"
                      onClick={ this.deleteButton }
                      disabled={ editor }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  editor: wallet.editor,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
  editButton: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Table);
