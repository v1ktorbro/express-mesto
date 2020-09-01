const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({}).then((users) => {
    return res.status(200).send(users);
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Ошибка на стороне сервера');
  });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Ошибка на стороне сервера');
  });
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(`Запрос выполнен. Пользователь ${user} создан`);
  } catch (err) {
    return res.status(404).send(err.message);
  }
  return console.log(`Запрос записи в БД пользователя: "${req.body.name}" выполнен.`);
};

module.exports.updInfoProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id, { name, about });
    res.status(200).send('Данные профиля обновлены.');
  } catch (err) {
    return res.status(404).send(err.message);
  }
  return console.log('Запрос на обновления профиля успешно выполнен.');
};
