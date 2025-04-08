import '../App.css';
import { Alert, TextField, Button } from '@mui/material';
import React,{ useState/*, useEffect*/ } from 'react';
import { register, login /*, saveUser */} from '../api.js';
// import { useAuth } from '../AuthContext.js';

const Login = () => {

  // react consts
  const [isError, switchError] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [signup, setsignup] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const { user, setUser } = useAuth();

  // effect for debugging
  // useEffect(() => {
  //   console.log('Current user state:', user);
  // }, [user]);

  // switches the react const between signup and login
  const signupSwitch = () => {
    setsignup((prev) => prev === 0 ? 1 : 0);
  }

  // switches the react const if there is/isnt an erro
  const errorSwitch = () => {
    switchError((prev) => prev === 0 ? 1 : 0);
  }

  // login
  const handleLogin = async () => {
    try {
      // calls the api to login the user
      const response = await login(username, password);
      // logs response for debugging
      console.log('Raw login response:', response);
      // saves a user using auth
      const userData = {
        username: response.username
      };
      // log for debugging
      console.log("Successfully Logged In - userData:", userData);

      
      // setUser(userData);
      // saveUser(userData);
      // if('user' in sessionStorage) {
      //   console.log('hello')
      // }

      // redirects to parks page as they are done logging in
      window.location.href = '/home';
    } catch (error) {
      console.error('Error logging in', error);
      // displays the error message for the user
      const errorMessage = error.error || 'An unknown error occurred';
      setErrorMsg(errorMessage);
      errorSwitch();
    }
  }

  // handle register
  const handleRegister = async () => {
    try {
      // checks thet all fields are there
      if(!username || !password || !confirmPassword){
        console.error('Please fill out all fields');
        return;
      }
      // calls api to register
      const response = await register(username, password, confirmPassword);
      
      // saes user data
      // const userData = {
      //   username: response.username
      // };

      // setUser(userData);
      // saveUser(userData);

      // logs for debugging
      console.log("Registered Successfully", response);

      // redirects to parks
      window.location.href = '/home';

    } catch (error) {
      console.error('Error registering', error);
      // displays error for user
      const errorMessage = error.error || 'An unknown error occurred';
      setErrorMsg(errorMessage);
      errorSwitch();
    }
  }

  // changes user 
  const handleUserChange = (event) => {
    setUsername(event.target.value);
    if(isError === 1){
      errorSwitch();
    }
  };

  // change password
  const handlePassChange = (event) => {
    setPassword(event.target.value);
    if(isError === 1){
      errorSwitch();
    }
  };

  // change confirm password
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