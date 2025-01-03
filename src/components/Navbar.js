import React from 'react';
import './Navbar.css';
//import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {

  // const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <div class='Logo-pic'>
            <img src="/assets/PickUp-Logo.png" alt="Logo" className="logo-image" />
          </div>
        </a>
        {/* Navigation Links */}
        <div className="nav-links">
          <a href="/about" className="nav-item">
              About
          </a>
          <a href="/friends" className="nav-item">
            Friends
          </a>
          <a href="/login" className="nav-item login-button">
              Login
          </a>
          {/* Profile Picture */}
          <a href="/profile" className="navbar-pfp">
          <div class='profile-pic'>
            <img src="/assets/default-pfp2.jpg" alt="Profile" className="navbar-profile-pic" />
          </div>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;