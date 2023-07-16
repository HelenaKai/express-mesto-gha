const User = require('../models/user');
const { ERROR_BAD_REQUEST_CODE, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');

// Получить данные о всех пользователях
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res
      .status(ERROR_DEFAULT)
      .send({ message: 'На сервере произошла ошибка.' }));
};

// Получить данные о пользователе по userId
const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Получение пользователя с некорректным id.' });
      } else if (err.message === 'Not found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

// Создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

// Обновление данных user
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.message === 'Not found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

// Обновление данных user -> avatar
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else if (err.message === 'Not found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
