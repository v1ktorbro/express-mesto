const router = require('express').Router();
const {
  getAllCards, createCard, deleteCard, putLikeCard, deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);

router.put('/:id/likes', putLikeCard);

router.delete('/:id/likes', deleteLikeCard);

module.exports = router;
