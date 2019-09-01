import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Contact 1',
        email: 'c1@gmail.com',
        type: 'personal',
        phone: '222-222-222',
      },
      {
        id: 1,
        name: 'Contact 2',
        email: 'c1@gmail.com',
        type: 'professional',
        phone: '222-222-222',
      },
      {
        id: 1,
        name: 'Contact 3',
        email: 'c1@gmail.com',
        type: 'personal',
        phone: '222-222-222',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
