
function carregarUsuarios() {                                                                        // Função para carregar os usuários e exibi-los na página
    fetch("http://localhost:3000/usuarios") 
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar usuários");
            }
            return response.json(); 
        })
        .then(usuarios => {
            const container = document.getElementById("usuarios-container");
            container.innerHTML = ""; 

            
            usuarios.forEach(usuario => {
                const usuarioDiv = document.createElement("div");
                usuarioDiv.classList.add("usuario-card");

                usuarioDiv.innerHTML = `
                    <p><strong>Nome:</strong> ${usuario.nome}</p>
                    <p><strong>Username:</strong> ${usuario.username}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <div class="button-container">
                        <button class="view-btn" onclick="visualizarUsuario(${usuario.id})">Visualizar</button>
                        <button class="edit-btn" onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button class="delete-btn" onclick="deletarUsuario(${usuario.id})">Deletar</button>
                    </div>
                `;
                container.appendChild(usuarioDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar usuários:", error);
            alert("Erro ao carregar usuários!");
        });
}


function visualizarUsuario(id) {                                                                    // Função para exibir os detalhes do usuário
    fetch(`http://localhost:3000/usuarios/${id}`)
        .then(response => response.json())
        .then(usuario => {
            const modal = document.getElementById("modal-visualizar");
            const detalhes = document.getElementById("detalhes-usuario");
            detalhes.innerHTML = `
                <strong>Nome:</strong> ${usuario.nome}<br>
                <strong>Username:</strong> ${usuario.username}<br>
                <strong>Email:</strong> ${usuario.email}<br>
            `;
            modal.style.display = "flex"; 
        })
        .catch(error => {
            console.error("Erro ao buscar os detalhes do usuário:", error);
            alert("Erro ao buscar os detalhes do usuário!");
        });
}


function fecharModal(modalId) {                                                                    // Função para fechar o modal
    const modal = document.getElementById(modalId);
    modal.style.display = "none"; 
}


function editarUsuario(id) {                                                                       // Função para editar os dados do usuário
    fetch(`http://localhost:3000/usuarios/${id}`)
        .then(response => response.json())
        .then(usuario => {
            
            document.getElementById("editar-nome").value = usuario.nome;                           // Preenche os campos do modal com os dados do usuário
            document.getElementById("editar-username").value = usuario.username;
            document.getElementById("editar-email").value = usuario.email;

            
            const modal = document.getElementById("modal-editar");                                 // Exibe o modal de edição
            modal.style.display = "flex";

            
            const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");
            btnSalvarEdicao.onclick = function () {
               
                const nome = document.getElementById("editar-nome").value;                          // Coleta os valores atualizados
                const username = document.getElementById("editar-username").value;
                const email = document.getElementById("editar-email").value;

                
                fetch(`http://localhost:3000/usuarios/${id}`, {                                     // Envia os dados atualizados para o back-end
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nome, username, email }) 
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Erro ao atualizar o usuário");
                        }
                        alert("Usuário atualizado com sucesso!");
                        fecharModal("modal-editar"); 
                        carregarUsuarios(); 
                    })
                    .catch(error => {
                        console.error("Erro ao atualizar o usuário:", error);
                        alert("Erro ao atualizar o usuário!");
                    });
            };
        })
        .catch(error => {
            console.error("Erro ao buscar os dados do usuário:", error);
            alert("Erro ao buscar os dados do usuário!");
        });
}


function deletarUsuario(id) {                                                                        // Função para deletar um usuário
    if (confirm("Deseja realmente deletar este usuário?")) {
        fetch(`http://localhost:3000/usuarios/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao deletar usuário");
                }
                alert("Usuário deletado com sucesso!");
                carregarUsuarios(); 
            })
            .catch(error => {
                console.error("Erro ao deletar usuário:", error);
                alert("Erro ao deletar o usuário!");
            });
    }
}


carregarUsuarios();
