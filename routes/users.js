const router = require('express').Router();

const {
  getAllUsers, getUser, createUser, updInfoProfile,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.patch('/me', updInfoProfile);

module.exports = router;
