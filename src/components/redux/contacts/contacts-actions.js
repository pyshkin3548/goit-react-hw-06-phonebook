import { createAction } from '@reduxjs/toolkit';
import shortid from 'shortid';

const addContact = createAction('contacts/add', (name, number) => ({
    payload: {
      id: shortid.generate(),
      name,
      number,
    },
}));

const deleteContact = createAction('contacts/delete');
const clearFilter = createAction('contacts/clearFilter');
const changeFilter = createAction('contacts/changeFilter');
// eslint-disable-next-line
export default { addContact, deleteContact, clearFilter, changeFilter };