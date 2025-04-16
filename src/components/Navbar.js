import React from 'react';
import './Navbar.css';
import { useAuth } from '../AuthContext.js';
import { logout } from '../api.js';

function Navbar() {

  const { setUser } = useAuth();    

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          {/* <h1 className="nav-item">Hello, {user ? user.user.username : "Guest"}</h1> */}
          {/* Logo */}
          <a href="/home" className="navbar-logo">
            <div className='Logo-pic'>
              <img src="/assets/PickUp-Logo.png" alt="Logo" className="logo-image" />
            </div>
          </a>
        </div>
        {/* Navigation Links */}
        <div className="nav-links">
          <a href="/about" className="nav-item">
              About
          </a>
          {/* <a href="/friends" className="nav-item">
            Friends
          </a> */}
          { !('user' in sessionStorage) ? (
            <a href="/" className="nav-item login-button">
            Login
            </a>
          ) : (
            <div className="p-dropdown">
              <img 
                src={user.user.profile.picture || "/assets/default-pfp.jpg"}
                alt="Profile" 
                className="navbar-profile-pic p-dropdown-btn"
              />
              <div className="p-dropdown-content">
                <a href="/profile">Profile</a>
                <a href="/" className="logout-button" onClick={() => handleLogout()}>Log Out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
