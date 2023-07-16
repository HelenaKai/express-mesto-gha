const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Получить данные о всех карточках
router.get('/', getCards);

// Добавление данных
router.post('/', createCard);

// Удаление данных
router.delete('/:id', deleteCard);

// Добавить лайк
router.put('/:id/likes', likeCard);

// Удалить лайк
router.delete('/:id/likes', dislikeCard);

module.exports = router;
