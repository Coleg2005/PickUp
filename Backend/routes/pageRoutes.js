import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import User from '../models/user.js';
import { checkJwt, extractUserId } from '../middleware/token.js';
const router = express.Router();

router.get('/profile', checkJwt, async (req, res) => {
  // Get user ID from token
  const userId = extractUserId(req);

  // Find user in database
  const user = await User.findOne({"auth0Id": userId});

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

router.get('/:username/public', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('profile.description profile.location')

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// const auth0Management = new ManagementClient({
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
// });

// app.patch('/api/user/description', async (req, res) => {
//   try {
//     const { user_id, description } = req.body;
    
//     await auth0Management.updateUserMetadata(
//       { id: user_id },
//       { description: description }
//     );
    
//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error updating user metadata:', error);
//     res.status(500).json({ error: 'Failed to update description' });
//   }
// });