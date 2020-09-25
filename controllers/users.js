const User = require('../models/user');
const NotFound = require('../errors/NotFound');

module.exports.getAllUsers = (req, res) => {
  User.find({}).then((users) => {
    return res.status(200).send(users);
  }).catch((err) => {
    console.log(err);
    return res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      throw new NotFound('Нет пользователя с таким id');
    }
    return res.status(200).send(user);
  }).catch(next);
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(`${user}`);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные.' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.updInfoProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id,
      { name, about },
      { new: true, runValidators: true }).orFail(new Error('NotValidId'));
    return res.status(200).send('Данные профиля успешно обновлены.');
  } catch (err) {
    if (err.message === 'NotValidId') {
      return res.status(404).send({ message: 'Неправильно передан id пользователя' });
    }
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  }
};

module.exports.updAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id,
      { avatar },
      { new: true, runValidators: true }).orFail(new Error('NotValidId'));
    return res.status(200).send('Аватар успешно обновлен');
  } catch (err) {
    if (err.message === 'NotValidId') {
      return res.status(404).send({ message: 'Неправильно передан id пользователя' });
    }
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  }
};
