const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  const userId = jwt.verify(token, process.env.TOKEN_SECRET);
  User.findByPk(userId).then((user) => {
    req.user = user;
    next();
  });
};
