const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  // console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    console.log("Decoded user:", decoded); // Debugging

    req.user = decoded; // Ensure req.user is set
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;