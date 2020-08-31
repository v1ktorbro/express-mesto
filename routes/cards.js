const router = require('express').Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);

module.exports = router;
