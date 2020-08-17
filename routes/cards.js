const express = require('express');

const cards = require('../data/cards.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(cards);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!cards[id]) {
    res.status(404).send({ error: 'Такой карточки нет' });
    return;
  }
  res.status(200).send(cards[id]);
});

module.exports = router;
