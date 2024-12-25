import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline']

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  name, 
  type, 
  onClick, 
  buttonStyle, 
  buttonSize
}) => {
  const checkButtonStyle = StyleSheet.includes(buttonStyle) 
  ? buttonStyle 
  : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  return (
    <Link to='/sign-up' className='bth-mobile'>
      <button
      className={'btn ${checkButtonStyle} ${checkButtonSize}'}
      onClick={onClick}
      type={type}
      >
        {name}
      </button>
    </Link>
  )
};