import jwt from 'jsonwebtoken';

// Middleware function to authenticate JWT
const checkJwt = (req, res, next) => {

  // checks that token was created in the cookies
  const token = req.cookies.token;

  // if no token, no access
  if (!token) {
    return res.status(401).json({ isAuthenticated: false, message: "Access denied. No token provided." });
  }

  try {    
    // checks that secret matches and sends info to next function
    const secretKey = process.env.JWT_SECRET; // Use environment variables for security
    const decoded = jwt.verify(token, secretKey);
    // attaches info to request
    req.user = decoded; // Attach decoded user info to request object
    next(); // Pass control to the next middleware
  } catch (error) {
      res.status(403).json({ isAuthenticated: false, message: "Access denied. Invalid token." });
  }
};

export default checkJwt;