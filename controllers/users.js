const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({}).then((users) => {
    res.status(200).send(users);
  }).catch((err) => {
    console.log(err);
    res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
    res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  });
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(`Запрос выполнен. Пользователь ${user} создан`);
  } catch (err) {
    res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  }
};

module.exports.updInfoProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id,
      { name, about },
      { new: true, runValidators: true });
    res.status(200).send('Данные профиля успешно обновлены.');
  } catch (err) {
    res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  }
};

module.exports.updAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id,
      { avatar },
      { new: true, runValidators: true });
    res.status(200).send('Аватар успешно обновлен');
  } catch (err) {
    res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  }
};
