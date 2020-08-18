const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const cards = path.join(__dirname, '..', 'data', 'cards.json');

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile(cards, { encoding: 'utf8' }).then((data) => {
    return res.status(200).send(JSON.parse(data));
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Ошибка на стороне сервера');
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(cards, { encoding: 'utf8' }).then((data) => {
    const card = JSON.parse(data).find((eachCard) => {
      return eachCard._id === req.params.id;
    });
    if (!card) {
      return res.status(404).send({ error: 'Такой карточки нет' });
    }
    return res.send(card);
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Ошибка на стороне сервера');
  });
});

module.exports = router;
