const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({}).then((cards) => {
    return res.status(200).send(cards);
  }).catch((err) => {
    console.log(err);
    return res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
  });
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    await Card.create({ name, link, owner: req.user._id });
    return res.status(200).send(`Запрос выполнен. Карточка ${name} создана.`);
  } catch (err) {
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    await Card.deleteOne({ _id: req.params.id }).orFail(new Error('NotValidCardId'));
    return res.status(200).send('Карточка удалена.');
  } catch (err) {
    if (err.message === 'NotValidCardId') {
      return res.status(404).send({ message: 'Карточка не существует, либо уже была удалена.' });
    }
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
  }
};

module.exports.putLikeCard = async (req, res) => {
  try {
    await Card.findByIdAndUpdate(req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }).orFail(new Error('NotValidCardId'));
    return res.status(200).send('Лайк карточке успешно поставлен.');
  } catch (err) {
    if (err.message === 'NotValidCardId') {
      return res.status(404).send({ message: 'Вы не можете поставить лайк — карточки не существует.' });
    }
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
  }
};

module.exports.deleteLikeCard = async (req, res) => {
  try {
    await Card.findByIdAndUpdate(req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }).orFail(new Error('NotValidCardId'));
    return res.status(200).send('Вы удалили лайк у карточки');
  } catch (err) {
    if (err.message === 'NotValidCardId') {
      return res.status(404).send({ message: 'Вы не можете удалить лайк — карточки не существует.' });
    }
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
  }
};
