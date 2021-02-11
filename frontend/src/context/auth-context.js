import React from 'react';

const authContext = React.createContext({
  isLoggedIn: false,
  login: () => {}
});

export default authContext;
