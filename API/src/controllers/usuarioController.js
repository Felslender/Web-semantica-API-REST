const usuarioModel = require('../model/usuarioModel');

const createUser = async (req, res) => {
    const infoUser = req.body;
    const result = await usuarioModel.createUser(infoUser);
    res.status(201).json({ message: "Usuário criado com sucesso", result });
};

const getUsers = async (req, res) => {
    const users = await usuarioModel.getUsers();
    res.status(200).json(users);
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    const infoUser = req.body;
    await usuarioModel.updateUser(id, infoUser);
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
};

const patchUser = async (req, res) => {
    const { id } = req.params;
    const infoUser = req.body;
    await usuarioModel.patchUser(id, infoUser);
    res.status(200).json({ message: "Usuário atualizado parcialmente" });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await usuarioModel.deleteUser(id);
    res.status(200).json({ message: "Usuário excluído com sucesso" });
};


module.exports = {
    createUser,
    getUsers,
    updateUser,
    patchUser,
    deleteUser
}