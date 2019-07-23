const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  try {
    jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
      if (err) throw err;
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
