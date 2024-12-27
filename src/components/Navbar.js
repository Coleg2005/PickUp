import React from 'react';
import './Navbar.css';
// import AuthProvider from './Auth.js';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          Home
        </a>

        {/* Navigation Links */}
        <div className="nav-links">
          <a href="/parks" className='nav-item'>
            Parks
          </a>
          <a href="/account" className="nav-item">
            Account
          </a>
          <a href="/friends" className="nav-item">
            Friends
          </a>
          <a href="/login" className="nav-item">
            Login
          </a>
          <a href="/sign-up" className="nav-item signup-button">
            SIGN UP
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;