const jwt = require('jsonwebtoken');
require('dotenv').config();
const { log } = console;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined')
    return res
      .status(401)
      .json({ status: 'error', error: 'Unauthorized - Header not set' });
  const token = authHeader.split(' ')[1];
  if (!token)
    return res
      .status(401)
      .json({ status: 'error', error: 'Unauthorized, please provide a token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch ({ message }) {
    log(message);
    res.status(400).json({ status: 'error', error: 'Invalid Token' });
  }
};

module.exports = {
  verifyToken,
};
