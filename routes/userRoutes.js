const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/users', UserController.listar);
router.post('/users', UserController.criar);
router.put('/users/:id', UserController.atualizar);
router.delete('/users/:id', UserController.excluir);

module.exports = router;
