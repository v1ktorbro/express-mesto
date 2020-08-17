const users = require('../data/users.json');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res
        .status(200)
        .send(users)
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if(!users[id]) {
    res
    .status(404)
    .send({ message: 'Нет пользователя с таким id'})
    return
  }
  res
  .status(200)
  .send(users[id])
})

module.exports = router