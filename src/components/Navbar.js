import React from 'react';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {

  const { logout, loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div className='nav-item login-button'>Loading...</div>;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <div className='Logo-pic'>
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
          { !isAuthenticated ? (
            <a href="/" className="nav-item login-button" onClick={() => loginWithRedirect()}>
            Login
            </a>
          ) : (
            <div className="p-dropdown">
              <img 
                src={user.picture || "/assets/default-pfp2.jpg"}
                alt="Profile" 
                className="navbar-profile-pic p-dropdown-btn"
              />
              <div className="p-dropdown-content">
                <a href="/profile">Profile</a>
                <a href="/" className="logout-button" onClick={() => logout()}>Log Out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
