const jwt = require('jsonwebtoken');

function authenticateAdmin(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    if (req.user.role === 'admin') {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden - Users only' });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = { authenticateAdmin };
