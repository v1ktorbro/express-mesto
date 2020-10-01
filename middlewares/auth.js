const Unauthorized = require('../errors/Unauthorized');

module.exports.authorization = (req, res, next) => {
  const payload = req.cookies.jwt;
  if (!payload) {
    throw new Unauthorized('Для продолжения необходимо авторизоваться');
  }
  return next();
};
