const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { ERROR_NOT_FOUND } = require('./errors/errors');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64b3cdf859c6a125f78aff4f', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

mongoose.connect(DB_URL);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use('*', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрошен несуществующий роут' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен! Порт ${PORT}`);
});
