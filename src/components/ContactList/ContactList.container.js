import { connect } from 'react-redux';
import contactsActions from '../redux/contacts/contacts-actions';
import ContactList from './ContactList';

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  
  let contacts = allContacts.filter(({name}) => name.toLowerCase().includes(normalizedFilter));
    //  if (!contacts.length) contacts = allContacts;
    return contacts
  };

const mapStateToProps = ({contacts: {items, filter}}) => ({
  contacts: getVisibleContacts(items,  filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: (id) => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);