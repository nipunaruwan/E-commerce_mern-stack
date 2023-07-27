const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const User = require('../models/User');


console.log('__dirname:', __dirname);
const configPath = require.resolve('../config');
console.log('Config path:', configPath);

// Middleware function to authenticate and authorize users
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not found.' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, SECRET_KEY);

    // Find the user based on the decoded token's userId
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // Attach the user object to the request for future use in protected routes
    req.user = user;
    req.token = token;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
