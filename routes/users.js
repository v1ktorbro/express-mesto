const router = require('express').Router();
const {
  getAllUsers, getUser, createUser, updInfoProfile, updAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updInfoProfile);
router.patch('/me/avatar', updAvatar);

module.exports = router;
