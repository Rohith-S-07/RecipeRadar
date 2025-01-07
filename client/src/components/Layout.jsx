import React from 'react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="content content-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;