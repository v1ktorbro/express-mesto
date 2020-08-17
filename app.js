const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const { usersRouter } = require('./routes');
const { cardsRouter } = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('*', (req, res) => {
  res
  .status(404)
  .send({ message: 'Запрашиваемый ресурс не найден' })
})

app.listen(PORT, () => {
    console.log(`PORT раздается на сервере ${PORT}`)
})