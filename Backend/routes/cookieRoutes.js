import express from 'express';
import checkJwt from '../middleware/auth.js';
const router = express.Router();

// Get specific cookies
router.get("/get/:name", authenticateJwt, (req, res) => {
  const cookieName = req.params.name;
  
  if (!req.cookies[cookieName]) {
    return res.status(404).json({ error: `Cookie '${cookieName}' not found` });
  }
  
  res.json({ 
    [cookieName]: req.cookies[cookieName]
  });
});

// Set a custom cookie
router.post("/set", checkJwt, (req, res) => {
  const { name, value } = req.body;
  
  if (!name || !value) {
    return res.status(400).json({ error: "Cookie name and value are required" });
  }
  
  const cookieOptions = {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  };
  
  res.cookie(name, value, cookieOptions);
  res.json({ message: `Cookie '${name}' has been set` });
});

// Delete a specific cookie
router.delete("/delete", checkJwt, (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "Cookie name is required" });
  }
  
  res.clearCookie(name);
  res.json({ message: `Cookie '${name}' has been deleted` });
});

// Get user data and save it as a cookie (useful after login)
router.post("/save-user", checkJwt, (req, res) => {
  try {
    // Since the route is protected by checkJwt, we know req.user is available
    const userData = {
      id: req.user.id,
      username: req.user.username
    };
    
    // Save the user data as a cookie
    res.cookie('userData', JSON.stringify(userData), {
      httpOnly: false, // Making it accessible to client-side JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({ 
      message: 'User data saved to cookie',
      userData
    });
  } catch (error) {
    console.error('Error saving user data to cookie:', error);
    res.status(500).json({ error: 'Failed to save user data' });
  }
});

export default router;