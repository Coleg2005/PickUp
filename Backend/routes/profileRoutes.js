import express from 'express';
import User from '../models/User.js';
import checkJwt from '../middleware/auth.js';
const router = express.Router();

router.post('/updateProfile', checkJwt, async (req, res) => {
  try {
    const { description, picture, username } = req.body;
    if (!description || !picture) {
      return res.status(400).json({ error: 'profile is required' });
    }
    const user = await User.findOne({ username });
    user.description = description;
    user.picture = picture;
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

export default router;