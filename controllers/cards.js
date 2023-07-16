const Card = require('../models/card');
const { ERROR_BAD_REQUEST_CODE, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');

// Получить данные о всех карточках
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' }));
};

// Создать карточку
const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

// Удалить карточку
const deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные для удаления карточки.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

// Поставить лайк карточке
const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
