const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({}).then((cards) => {
    return res.status(200).send(cards);
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Ошибка на стороне сервера');
  });
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(`Запрос выполнен. Карточка ${card} создана.`);
  } catch (err) {
    console.log(err);
    return res.status(404).send(err.message);
  }
  return console.log(`Запрос записи в БД карточки: "${req.body.name}" выполнен.`);
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    res.status(200).send(`Карточка "${card.name}" удалена.`);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
};
