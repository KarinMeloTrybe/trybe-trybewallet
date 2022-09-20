import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { fetchCurrencies, isEditing, updateExpense } from '../redux/actions';

const tagText = 'Alimentação';
class Wallet extends React.Component {
  state = {
    inputDescription: '',
    inputValue: '',
    inputCurrency: 'USD',
    inputMethod: 'Dinheiro',
    inputTag: tagText,
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  editButton = (event) => {
    const { dispatch, expenses } = this.props;
    event.preventDefault();
    dispatch(isEditing(+event.target.id));
    const expense = expenses.find((item) => +item.id === +event.target.id);
    this.setState({
      inputDescription: expense.description,
      inputValue: expense.value,
      inputCurrency: expense.currency,
      inputMethod: expense.method,
      inputTag: expense.tag,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch, editor, idToEdit, expenses } = this.props;
    const { inputDescription: description,
      inputValue: value,
      inputCurrency: currency,
      inputMethod: method,
      inputTag: tag,
      id } = this.state;
    if (editor) {
      const newExpenses = expenses.map((item) => {
        if (item.id === idToEdit) {
          return {
            ...item,
            value,
            currency,
            description,
            method,
            tag,
          };
        }
        return item;
      });
      dispatch(updateExpense(newExpenses));
      this.setState({
        inputDescription: '',
        inputValue: '',
        inputCurrency: 'USD',
        inputMethod: 'Dinheiro',
        inputTag: tagText,
      });
    } else {
      dispatch(fetchCurrencies({ description,
        value,
        currency,
        method,
        tag,
        id }, 'save'));
      this.setState({
        inputDescription: '',
        inputValue: '',
        inputCurrency: 'USD',
        inputMethod: 'Dinheiro',
        inputTag: tagText,
        id: id + 1,
      });
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  render() {
    const {
      inputDescription,
      inputValue,
      inputCurrency,
      inputMethod,
      inputTag,
    } = this.state;
    return (
      <div>
        <Header />
        <WalletForm
          inputDescription={ inputDescription }
          inputValue={ inputValue }
          inputCurrency={ inputCurrency }
          inputMethod={ inputMethod }
          inputTag={ inputTag }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
        />
        <Table
          editButton={ this.editButton }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});
export default connect(mapStateToProps)(Wallet);
