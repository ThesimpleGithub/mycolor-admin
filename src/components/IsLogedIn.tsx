import React, { ReactElement } from 'react';
import Login from './Login';

const IsLogedIn = ({ children }: { children: ReactElement }) => {
  return document.cookie.includes('isLogin') ? children : <Login />;
};

export default IsLogedIn;
