import express from 'express';
import User from '../models/user.js';
import { checkJwt, extractUserId } from '../middleware/auth.js';
const router = express.Router();

router.post('/friend', checkJwt, async (req, res) => {
  try {
    // Get user ID from token
    const userId = extractUserId(req);

    // Find user in database
    const user = await User.findOne({"auth0Id": userId});

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find friend in database
    const friend = await User.findOne({"username": req.body.username});

    // If friend not found, return error
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    // Add friend to user's friends list
    user.friends.push(friend.username);
    await user.save();

  } catch {
    res.status(500).json({ error: 'Error adding friend' });
  }
});

router.get('/friends', checkJwt, async (req, res) => {
  try {
    // Get user ID from token
    const userId = extractUserId(req);

    // Find user in database
    const user = await User.findOne({"auth0Id": userId});

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user's friends list
    const friends = user.friends;
    res.json(friends);

  } catch {
    res.status(500).json({ error: 'Error getting friends list' });
  }
});

router.delete('/friend', checkJwt, async (req, res) => {
  try {
    // Get user ID from token
    const userId = extractUserId(req);

    // Find user in database
    const user = await User.findOne({"auth0Id": userId});

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find friend in database
    const friend = await User.findOne({"username": req.body.username});

    // If friend not found, return error
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    // Remove friend from user's friends list
    user.friends = user.friends.filter(f => f !== friend.username);
    await user.save();
    

  } catch {
    res.status(500).json({ error: 'Error deleting friend' });
  }
});