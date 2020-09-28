const Card = require('../models/card');
const NotFound = require('../errors/NotFound');

module.exports.getAllCards = (req, res, next) => {
  Card.find({}).then((cards) => {
    if (!cards) {
      throw new NotFound('Не удается загрузить карточки');
    }
    return res.status(200).send(cards);
  }).catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((result) => {
    return res.status(201).send(`${result}`);
  }).catch(next);
};

module.exports.deleteCard = async (req, res, next) => {
  Card.deleteOne({ _id: req.params.id }).then((card) => {
    if (!card.n) {
      throw new NotFound('Карточка не существует, либо уже была удалена.');
    }
    return res.status(200).send('Карточка удалена.');
  }).catch(next);
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }).then((findCard) => {
    if (!findCard) {
      throw new NotFound('Вы не можете поставить лайк — карточки не существует.');
    }
    return res.status(200).send('Лайк карточке успешно поставлен.');
  }).catch(next);
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }).then((findCard) => {
    if (!findCard) {
      throw new NotFound('Вы не можете удалить лайк — карточки не существует.');
    }
    return res.status(200).send('Вы удалили лайк у карточки');
  }).catch(next);
};
