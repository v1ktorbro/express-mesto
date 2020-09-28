const User = require('../models/user');
const NotFound = require('../errors/NotFound');

module.exports.getAllUsers = (req, res, next) => {
  User.find({}).then((users) => {
    if (!users) {
      throw new NotFound('Не удается загрузить список пользователей');
    }
    return res.status(200).send(users);
  }).catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      throw new NotFound('Нет пользователя с таким id');
    }
    return res.status(200).send(user);
  }).catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => {
    return res.status(201).send(`${user}`);
  }).catch(next);
};

module.exports.updInfoProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true }).then((user) => {
    if (!user) {
      throw new NotFound('Неправильно передан id пользователя');
    }
    return res.status(200).send('Данные профиля успешно обновлены.');
  }).catch(next);
};

module.exports.updAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    { new: true, runValidators: true }).then((user) => {
    if (!user) {
      throw new NotFound('Неправильно передан id пользователя');
    }
    return res.status(200).send('Аватар успешно обновлен');
  }).catch(next);
};
