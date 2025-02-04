import jwt from 'jsonwebtoken';

// Sedn this when making a call
// Authorization: Bearer YOUR_JWT_TOKEN


// Middleware function to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
      const secretKey = process.env.JWT_SECRET; // Use environment variables for security
      const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
      req.user = decoded; // Attach decoded user info to request object
      next(); // Pass control to the next middleware
      res.status(200).json({ message: "Token verified" });
  } catch (error) {
      res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticateJWT;