
document.getElementById("btnSalvar").addEventListener("click", function (event) {                                   // Botão Salvar 
    event.preventDefault(); 

   
    const nome = document.getElementById("nome").value;                                                             // Captura os valores dos campos do formulário
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;


    const usuario = {
        nome: nome,
        username: username,
        email: email,
        senha: senha,
    };

    
    fetch("http://localhost:3000/usuarios", {                                                                     // Envia a requisição para o servidor
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro na requisição");
            }
        })
        .then((data) => {
            console.log("Usuário salvo:", data);
            alert("Usuário salvo com sucesso!");

            
            document.getElementById("nome").value = "";                                                              // Limpa os campos do formulário
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
        })
        .catch((error) => {
            console.error("Erro ao salvar o usuário:", error);
            alert("Erro ao salvar o usuário!");
        });
});


function deletarUsuario(id) {                                                                                        // DELETAR USUÁRIO
    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário deletado com sucesso!');
            
            carregarUsuarios();
        } else {
            throw new Error('Erro ao deletar o usuário');
        }
    })
    .catch(error => {
        console.error('Erro ao deletar o usuário:', error);
        alert('Erro ao deletar o usuário!');
    });
}


function editarUsuario(id) {                                                                                   // EDITAR USUÁRIO
    
    fetch(`http://localhost:3000/usuarios/${id}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById('nome').value = usuario.nome;
            document.getElementById('username').value = usuario.username;
            document.getElementById('email').value = usuario.email;
            document.getElementById('senha').value = usuario.senha;

            
            document.getElementById('btnSalvar').onclick = function () {
                const nome = document.getElementById('nome').value;
                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const senha = document.getElementById('senha').value;

                fetch(`http://localhost:3000/usuarios/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, username, email, senha })
                })
                .then(response => {
                    if (response.ok) {
                        alert('Usuário atualizado com sucesso!');

                    
                        document.getElementById("nome").value = "";                                             // Limpa os campos do formulário após edição
                        document.getElementById("username").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("senha").value = "";

                        carregarUsuarios(); 
                    } else {
                        throw new Error('Erro ao atualizar o usuário');
                    }
                })
                .catch(error => {
                    console.error('Erro ao atualizar o usuário:', error);
                    alert('Erro ao atualizar o usuário!');
                });
            };
        });
}
