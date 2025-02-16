import jwt from 'jsonwebtoken';

// Middleware function to authenticate JWT
const authenticateJWT = (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false, message: "Access denied. No token provided." });
  }

  try {    
    const secretKey = process.env.JWT_SECRET; // Use environment variables for security
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach decoded user info to request object
    next(); // Pass control to the next middleware
  } catch (error) {
      res.status(403).json({ isAuthenticated: false, message: "Access denied. Invalid token." });
  }
};

export default authenticateJWT;