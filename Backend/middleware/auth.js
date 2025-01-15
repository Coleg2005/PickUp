import jwt from 'express-jwt';
import { auth } from 'express-oauth2-jwt-bearer';

// Auth middleware
export const checkJwt = auth({
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
});

// Middleware to extract user ID from Auth0 token
export const extractUserId = (req, res, next) => {
  const auth0Id = req.auth.payload.sub;
  if (!auth0Id) {
    return res.status(401).json({ error: 'User ID not found in token' });
  }
  req.auth0Id = auth0Id;
  next();
};