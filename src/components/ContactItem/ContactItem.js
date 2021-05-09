import React from 'react'

import styles from './ContactItem.module.css';

const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <>
      <li className={styles.listItem}>
        <p className={styles.text}>
          {name} : {number}
        </p>
        <button className={styles.button} type="button" onClick={onDeleteContact}>
          Delete
        </button>
      </li>    
    </>
  );
};

export default ContactItem;
