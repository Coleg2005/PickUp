import React from 'react';
import './Navbar.css';
import { useAuth } from '../AuthContext.js';

function Navbar() {

  const { user, setUser } = useAuth();    

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null); // Clear user from context
  };

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
          {/* <a href="/friends" className="nav-item">
            Friends
          </a> */}
          { !user ? (
            <a href="/Login" className="nav-item login-button">
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
