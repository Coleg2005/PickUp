import express from 'express';
import User from '../models/user.js';
import { checkJwt, extractUserId } from '../middleware/auth.js';
const router = express.Router();

router.post('/description', checkJwt, async (req, res) => {
  try {
    // Get user ID from token
    const userId = extractUserId(req);

    // Find user in database
    const user = await User.findOne({"auth0Id": userId});

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user description
    user.profile.description = req.body;
    await user.save();
  } catch {
    res.status(500).json({ error: 'Error updating description' });
  } 

});

router.post('/pfp', checkJwt, async (req, res) => {
  try {
    // Get user ID from token
    const userId = extractUserId(req);

    // Find user in database
    const user = await User.findOne({"auth0Id": userId});

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user description
    user.profile.picture = req.body;
    await user.save();
  } catch {
    res.status(500).json({ error: 'Error updating profile picture' });
  } 

});

router.get('/description', checkJwt, async (req, res) => {
  try {
    // Get user ID from token
    const userId = extractUserId(req);

    // Find user in database
    const user = await User.findOne({"auth0Id": userId});

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user description
    res.json(user.profile.description);
  } catch {
    res.status(500).json({ error: 'Error getting description' });
  } 
});

router.get('/pfp', checkJwt, async (req, res) => {
  try {

    const userId = extractUserId(req);

    const user = await User.findOne({ "auth0Id": userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.profile.picture);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;