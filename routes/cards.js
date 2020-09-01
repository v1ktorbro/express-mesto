const router = require('express').Router();
const {
  getAllCards, createCard, deleteCard, putLikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);

router.put('/:id/likes', putLikeCard);

module.exports = router;
