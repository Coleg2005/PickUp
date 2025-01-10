// import express from 'express';
// import { auth } from 'express-oauth2-jwt-bearer';
// import User from '../models/user.js';
// const router = express.Router();

// // Auth middleware
// const checkJwt = auth({
//   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//   issuerBaseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
// });

// // Middleware to extract user ID from Auth0 token
// const extractUserId = (req, res, next) => {
//   const auth0Id = req.auth.payload.sub;
//   if (!auth0Id) {
//     return res.status(401).json({ error: 'User ID not found in token' });
//   }
//   req.auth0Id = auth0Id;
//   next();
// };

// router.get('/user/:username/public', async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username })
//       .select('profile.description profile.location')

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // const auth0Management = new ManagementClient({
// //   domain: process.env.AUTH0_DOMAIN,
// //   clientId: process.env.AUTH0_CLIENT_ID,
// //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
// // });

// // app.patch('/api/user/description', async (req, res) => {
// //   try {
// //     const { user_id, description } = req.body;
    
// //     await auth0Management.updateUserMetadata(
// //       { id: user_id },
// //       { description: description }
// //     );
    
// //     res.json({ success: true });
// //   } catch (error) {
// //     console.error('Error updating user metadata:', error);
// //     res.status(500).json({ error: 'Failed to update description' });
// //   }
// // });