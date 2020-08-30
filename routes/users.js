const router = require('express').Router();

const { getAllUsers, getUser, createUser } = require('../controllers/user');

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/', createUser);

module.exports = router;
