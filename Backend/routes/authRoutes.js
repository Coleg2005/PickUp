import express from 'express';
const router = express.router();

// Middleware to handle async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Convert callback-based functions to Promise-based
const loginAsync = (email, password) => {
  return new Promise((resolve, reject) => {
    login(email, password, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const createAsync = (user) => {
  return new Promise((resolve, reject) => {
    create(user, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Login route
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await loginAsync(email, password);
  res.json(user);
}));

// Register route
router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, nickname } = req.body;
  
  if (!email || !password || !nickname) {
    return res.status(400).json({ error: 'Email, password, and nickname are required' });
  }

  await createAsync({ email, password, nickname, email_verified: false });
  res.status(201).json({ message: 'User created successfully' });
}));

// Email verification route
router.post('/verify-email', asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const verified = await new Promise((resolve, reject) => {
    verify(email, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  if (!verified) {
    return res.status(404).json({ error: 'User not found or already verified' });
  }

  res.json({ message: 'Email verified successfully' });
}));

// Change password route
router.post('/change-password', asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  const updated = await new Promise((resolve, reject) => {
    changePassword(email, newPassword, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  if (!updated) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'Password changed successfully' });
}));

// Get user by email route
router.get('/user/:email', asyncHandler(async (req, res) => {
  const { email } = req.params;
  
  const user = await new Promise((resolve, reject) => {
    getByEmail(email, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}));

// Delete user route
router.delete('/user/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  await new Promise((resolve, reject) => {
    remove(id, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  res.json({ message: 'User deleted successfully' });
}));

export default router;