import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import contactsActions from '../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import shortid from 'shortid';
import Alert from '../Alert';
import alertStyle from '../transitionsStyles/fadeAlertStyle.module.css';

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
    error: false,
    textAlert: '',
  };

  inputNameId = shortid.generate();
  inputNumberId = shortid.generate();

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();

    if (name === '') {
      this.showAlert('Please enter your contact name!');
      return;
    }

    if (number === '') {
      this.showAlert('Please enter the contact phone number!');
      return;
    }

     if (this.props.contacts.some(contact => contact.name === name)) {
       this.showAlert(`${name} is already in contacts`);
       return;
    }

    this.props.onSubmit(name, number);
    this.reset();
  };

  showAlert = (text) => {
    this.reset();
    this.setState({ error: true, textAlert: text });
    setTimeout(() => this.setState({ error: false}), 2000);
 
}

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handlerChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { error, textAlert } = this.state;

    return (
      <>
        <CSSTransition in={error} classNames={alertStyle} timeout={250} unmountOnExit>
          <Alert text={textAlert}/>
        </CSSTransition>

        <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label} htmlFor={this.inputNameId}>
          <span>
            Name   
          </span>
        </label>
        <input
          className={styles.input}
          type="text"
          id={this.inputNameId}
          value={this.state.name}
          name="name"
          placeholder="Enter your name"
          // required
          onChange={this.handlerChange}
        />
        <label className={styles.label} htmlFor={this.inputNumberId}>
          <span>
            Number   
          </span>
        </label>
        <input
          className={styles.input}
          type="tel"
          id={this.inputNumberId}
          value={this.state.number}
          name="number"
          placeholder="Enter your number"
          onChange={this.handlerChange}
        />
        <button className={styles.button}>Add contact</button>
      </form>
      </>
      
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => dispatch(contactsActions.addContact(name, number))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

