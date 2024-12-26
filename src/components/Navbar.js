import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import 'Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="spacing">
          {/* Logo */}
          <Link to="/" className="nav-links">
            Parks <i className="fab fa-typo3" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to="/account" className="nav-links">
              Account
            </Link>
            <Link to="/friends" className="nav-links">
              Friends
            </Link>
            <Link to="/login" className="nav-links">
              Login
            </Link>
            <Button 
              variant="outlined" 
              component={Link} 
              to="/sign-up"
              className="signup-link"
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;