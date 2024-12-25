import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    window.innerWidth <= 960 ? setButton(false) : setButton(true);
  };

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            Parks <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/account' className='nav-links' onClick={closeMobileMenu}>
                Account
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/friends' className='nav-links' onClick={closeMobileMenu}>
                Friends
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar
