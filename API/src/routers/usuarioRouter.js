const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarioController');

//GET - obter todos os usuários
router.get('/get', controller.getUsers);

//POST - criar um novo usuário
router.post('/create', controller.createUser);

//PUT - atualizar completamente um usuário por ID
router.put('/:id', controller.updateUser);

//PATCH - atualizar parcialmente um usuário por ID
router.patch('/:id', controller.patchUser);

//DELETE - excluir um usuário por ID
router.delete('/delete/:id', controller.deleteUser);


module.exports = router