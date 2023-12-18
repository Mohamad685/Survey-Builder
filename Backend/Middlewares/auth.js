const jwt = require('jsonwebtoken');
const config = require('../Configurations/config');

function authenticateUser(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded.user;

    // Check if the user role is 'user'
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Forbidden - Admins only' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

function authenticateAdmin(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded.user;

    // Check if the user role is 'admin'
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden - Users only' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = { authenticateUser, authenticateAdmin };
