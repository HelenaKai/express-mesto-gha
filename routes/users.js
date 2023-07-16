const router = require('express').Router();

const {
  getUsers, createUser, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

// Получить данные о всех пользователях
router.get('/', getUsers);

// Получить данные о пользователе по id
router.get('/:id', getUser);

// Добавление данных
router.post('/', createUser);

// Обновление данных
router.patch('/me', updateUser);

// Обновление данных avatar
router.patch('/me/avatar', updateAvatar);

module.exports = router;
