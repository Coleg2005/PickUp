import '../App.css';
import { TextField, Button } from '@mui/material';
import React,{ useState } from 'react';
import { register, login } from '../api.js';

const Login = () => {

  const [signup, setsignup] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupSwitch = () => {
    setsignup((prev) => prev === 0 ? 1 : 0);
  }

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log("response", response);
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  const handleRegister = async () => {
    try {
      if(!username || !password || !confirmPassword){
        console.error('Please fill out all fields');
        return;
      }
      const response = await register(username, password, confirmPassword);
      console.log("Hello");
      console.log("response", response);
    } catch (error) {
      console.error('Error registering', error);
    }
  }

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConPassChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      <div className='login-page'>
        <h1>Sign In</h1>
        <TextField value={username} onChange={handleUserChange} placeholder='Username'/>
        <TextField value={password} onChange={handlePassChange} placeholder='Password'/>
        {signup === 1 ? 
          <>
          <TextField value={confirmPassword} onChange={handleConPassChange} placeholder='Confirm Password'/>
          <Button onClick={handleRegister}>Sign Up</Button>
          <Button onClick={signupSwitch}>Already have an account? Click here to Log in</Button>
          </>
         :
          <>
          <Button onClick={handleLogin}>Log In</Button>
          <Button onClick={signupSwitch}>Don't have an account? Click here to Sign Up</Button>
          </>
        }
        
      </div>
    </div>
  );
};

export default Login;