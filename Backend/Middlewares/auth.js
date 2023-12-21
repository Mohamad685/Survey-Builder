const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Check if the user user_type is 'user'
    if (req.user.user_type !== 'user') {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Check if the user user_type is 'admin'
    if (req.user.user_type !== 'admin') {
      return res.status(403).json({ message: 'Forbidden - Users only' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = { authenticateUser, authenticateAdmin };
