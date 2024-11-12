const API_URL = 'http://localhost:3000'; 

document.addEventListener('DOMContentLoaded', loadUsers);
document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value; 
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const user = { nome, email };

    try {
        let response;
        if (userId) {
            response = await fetch(`${API_URL}/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
        } else {
            response = await fetch(`${API_URL}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
        }

        if (!response.ok) {
            throw new Error('Erro ao salvar usuário');
        }

        alert(userId ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
        
        document.getElementById('userForm').reset();
        document.getElementById('userId').value = '';
        loadUsers();
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        alert('Erro ao salvar usuário. Verifique o console para mais detalhes.');
    }
});

async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/get`); 
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        const users = await response.json();
        const userTable = document.getElementById('userTable');
        userTable.innerHTML = '';

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id}, '${user.nome}', '${user.email}')">Editar</button>
                        <button class="action-btn" onclick="deleteUser(${user.id})">Excluir</button>
                    </td>
                </tr>
            `;
            userTable.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

function editUser(id, nome, email) {
    document.getElementById('userId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
}

async function deleteUser(id) {
    if (!confirm(`Tem certeza que deseja excluir o usuário com ID ${id}?`)) {
        return; 
    }

    try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir usuário com ID ${id}`);
        }

        alert('Usuário excluído com sucesso!');
        
        loadUsers();
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Não foi possível excluir o usuário. Verifique a conexão com a API.');
    }
}

