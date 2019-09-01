import React from 'react';
import Contacts from '../contacts/Contacts';

const Home = () => {
  return (
    <div class='grid-2'>
      <div>{/* Contact Form */}</div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
