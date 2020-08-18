const fs = require('fs').promises;
const express = require('express');

const router = express.Router();
const path = require('path');

const users = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  fs.readFile(users, { encoding: 'utf8' }).then((data) => {
    return res.status(200).send(JSON.parse(data));
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Ошибка на стороне сервера');
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(users, { encoding: 'utf8' }).then((data) => {
    const user = JSON.parse(data).find((eachUser) => {
      return eachUser._id === req.params.id;
    });
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Ошибка на стороне сервера');
  });
});

module.exports = router;
