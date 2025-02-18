import '../App.css';
import { Alert, TextField, Button } from '@mui/material';
import React,{ useState } from 'react';
import { register, login } from '../api.js';

const Login = () => {

  const [isError, switchError] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [signup, setsignup] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupSwitch = () => {
    setsignup((prev) => prev === 0 ? 1 : 0);
  }

  const errorSwitch = () => {
    switchError((prev) => prev === 0 ? 1 : 0);
  }

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log("Successfully Logged In", response);
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in', error);
      const errorMessage = error.error || 'An unknown error occurred';
      setErrorMsg(errorMessage);
      errorSwitch();
    }
  }

  const handleRegister = async () => {
    try {
      if(!username || !password || !confirmPassword){
        console.error('Please fill out all fields');
        return;
      }
      const response = await register(username, password, confirmPassword);

      console.log("Registered Successfully", response);
      window.location.href = '/';
    } catch (error) {
      console.error('Error registering', error);
      const errorMessage = error.error || 'An unknown error occurred';
      setErrorMsg(errorMessage);
      errorSwitch();
    }
  }

  const handleUserChange = (event) => {
    setUsername(event.target.value);
    if(isError === 1){
      errorSwitch();
    }
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
    if(isError === 1){
      errorSwitch();
    }
  };

  const handleConPassChange = (event) => {
    setConfirmPassword(event.target.value);
    if(isError === 1){
      errorSwitch();
    }
  };

  return (
    <div>
      <div className='login-page'>
        {signup === 1 ? 
          <>
          <h1>Sign Up</h1>
          <TextField value={username} onChange={handleUserChange} placeholder='Username'/>
          <TextField value={password} onChange={handlePassChange} placeholder='Password'/>
          <TextField value={confirmPassword} onChange={handleConPassChange} placeholder='Confirm Password'/>
          <Button onClick={handleRegister}>Sign Up</Button>
          <Button onClick={signupSwitch}>Already have an account? Click here to Log in</Button>
          </>
         :
          <>
          <h1>Log In</h1>
          <TextField value={username} onChange={handleUserChange} placeholder='Username'/>
          <TextField value={password} onChange={handlePassChange} placeholder='Password'/>
          <Button onClick={handleLogin}>Log In</Button>
          <Button onClick={signupSwitch}>Don't have an account? Click here to Sign Up</Button>
          </>
        }
        {isError === 1 ?
          <Alert severity="error">{errorMsg}</Alert>
        : null
        }
        
      </div>
    </div>
  );
};

export default Login;