const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const { usersRouter } = require('./routes');
const { cardsRouter } = require('./routes');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 99,
  message: 'За последние 15 минут Вами сделано не менее 100 запросов. В целях защиты системы от DoS-атак, пожалуйста, повторите запрос позже.',
});
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5f4c85abde49eb349cd7f3dc',
  };
  next();
});
app.use(limiter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.disable('etag');
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  //console.log(err)
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});
app.listen(PORT, () => {
  console.log(`PORT раздается на сервере ${PORT}`);
});
