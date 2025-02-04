import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import checkJwt from '../middleware/auth.js';
const router = express.Router();


// Middleware to handle async errors
// const asyncHandler = fn => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// Register route works
router.post('/register', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
  
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ error: 'username, password, and confirmed password are required' });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ error: "Failed to register", details: error.message });
  }
});

// Login route works
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  if (!await User.findOne({ username })) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const user = await User.findOne({ username });

  // const token = checkJwt(user._id);
  
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  return res.json({ message: 'Login successful' });
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