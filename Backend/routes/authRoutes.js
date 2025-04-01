import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import checkJwt from '../middleware/auth.js';
// import { deleteCookie } from '../../src/api.js'
const router = express.Router();

// Generates a random token with user info and secret key that expires within an hour
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h' 
  });
};

// Register route works
router.post('/register', async (req, res) => {
  try {
    // gets the info from req
    const { username, password, confirmPassword } = req.body;
    
    // checks that info is present
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ error: 'username, password, and confirmed password are required' });
    }

    // checks if username is already exists
    if (await User.findOne({ username })) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // checks that password confirmation matched
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // hashes the password and saves the user info as a user schema
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // on completeion sends sucess
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ error: "Failed to register", details: error.message });
  }
});

// Login route works
router.post('/login', async (req, res) => {
  // saves req info as const
  const { username, password } = req.body;
  
  // checks if info is there
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  // checks if user doesnt exist
  if (!await User.findOne({ username })) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // gets user from db
  const user = await User.findOne({ username });
 
  // if the entered password and db password dont match return error
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  // if it does match create token
  const token = generateToken(user);

  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', user);

  // // saves the created token as a cookie
  // res.cookie('token', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict'
  // });
 
  // returns a success message and user info for debugging
  return res.json({ 
    message: 'Login successful',
    username: username,
    password: password
  });
});

// logout route
router.post('/logout', () => {
  // deletes cookie and sends log out message
  // res.clearCookie('token');
  // res.clearCookie('userData');
  sessionStorage.clear();
  return res.json({ message: 'Logged out successfully'});
});

router.get('/check', checkJwt, (req, res) => {

  // const token = req.cookies.token;

  if(!token) {
    return res.json({ user:null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: { username: decoded.username } });
  } catch (error) {
    res.json({ user: null });
  }
});

// Change password route
// router.post('/change-password', async (req, res) => {
//   const { username, newPassword } = req.body;
  
//   if (!username || !newPassword) {
//     return res.status(400).json({ error: 'Email and new password are required' });
//   }

//   const updated = await new Promise((resolve, reject) => {
//     changePassword(email, newPassword, (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });

//   if (!updated) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   res.json({ message: 'Password changed successfully' });
// });

export default router;