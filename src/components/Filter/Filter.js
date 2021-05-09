import React from 'react'
import { connect } from 'react-redux';
import contactsActions from '../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import shortid from 'shortid';

const Filter = ({ name, onChange }) => {
  let inputFilterId = shortid.generate();
  return (
    <div className={styles.filterWrapper}>
      <label className={styles.label} htmlFor={inputFilterId}>
        <span>
          Find contacts by name
        </span>
      </label>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        id={inputFilterId}
        value={name}
        onChange={onChange}
      />
    </div>
  );
};

Filter.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(contactsActions.changeFilter(event.target.value)),
  // clearFilter: () => dispatch(contactsActions.clearFilter('')),
});


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
