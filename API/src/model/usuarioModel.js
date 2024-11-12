const connection = require('../config/connection');

class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

const createUser = async (infoUser) => {
    const { nome, email } = infoUser;
    const query = "INSERT INTO USUARIO (nome, email) VALUES (?, ?);";

    const newUser = new Usuario(nome, email);
    const [createdUser] = await connection.execute(query, [newUser.nome, newUser.email]);

    return createdUser;
};

const getUsers = async () => {
    const query = "SELECT * FROM USUARIO;";
    const [users] = await connection.execute(query);

    return users;
};

const updateUser = async (id, infoUser) => {
    const { nome, email } = infoUser;
    const query = "UPDATE USUARIO SET nome = ?, email = ? WHERE id = ?;";

    const [updatedUser] = await connection.execute(query, [nome, email, id]);

    return updatedUser;
};

const patchUser = async (id, infoUser) => {
    const fields = [];
    const values = [];

    for (const key in infoUser) {
        fields.push(`${key} = ?`);
        values.push(infoUser[key]);
    }

    const query = `UPDATE USUARIO SET ${fields.join(', ')} WHERE id = ?;`;
    values.push(id);

    const [patchedUser] = await connection.execute(query, values);

    return patchedUser;
};

const deleteUser = async (id) => {
    const query = "DELETE FROM USUARIO WHERE id = ?;";
    const [deletedUser] = await connection.execute(query, [id]);

    return deletedUser;
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    patchUser,
    deleteUser
};
