const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const { usersRouter } = require('./routes');
const { cardsRouter } = require('./routes');
const { login, registerUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { authorization } = require('./middlewares/auth');

const app = express();
app.use(cookieParser());
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
app.use(limiter);
app.use(requestLogger);
app.post('/users/signin', login);
app.post('/users/signup', registerUser);
app.use('/users', authorization, usersRouter);
app.use('/cards', authorization, cardsRouter);
app.use(errorLogger);
app.get('*', (req, res) => {
  return res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.disable('etag');
app.use(errors());
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});
app.listen(PORT, () => {
  console.log(`PORT раздается на сервере ${PORT}`);
});
