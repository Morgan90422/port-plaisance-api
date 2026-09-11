const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectPage = async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.redirect('/');
    }

    next();
  } catch (error) {
    return res.redirect('/');
  }
};

module.exports = protectPage;
