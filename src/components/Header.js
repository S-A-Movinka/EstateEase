import React from 'react';
import './Header.css';

const Header = ({ shortlistCount }) => (
  <header className="navbar">
    <div className="logo-section">
      <span className="brand-name">
        <img 
            src={`${process.env.PUBLIC_URL}/logo.png`} 
            alt="Logo" 
            className="logo" 
          />
        EstateEase </span>
    </div>
    <div className="header-icons">
      <span>❤️ {shortlistCount}</span>
      <button className="login-btn">Login</button>
    </div>
  </header>
);

export default Header;