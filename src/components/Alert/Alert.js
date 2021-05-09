import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.css';

const Alert = ({text}) => {
  return (
    <div className={styles.Container}>
      <p className={styles.Text}>{text}</p>
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Alert;