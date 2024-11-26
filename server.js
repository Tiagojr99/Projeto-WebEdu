const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'uscs123',
    database: 'webedu'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
    }
});


app.get('/usuarios', (req, res) => {                                                // Rota para buscar todos os usuários
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).send({ error: 'Erro no servidor' });
        } else {
            res.status(200).json(results);
        }
    });
});

  
app.get('/usuarios/:id', (req, res) => {                                            // Rota para buscar um usuário pelo ID
    const { id } = req.params;

    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).send({ error: 'Erro no servidor' });
        } else if (results.length === 0) {
            res.status(404).send({ message: 'Usuário não encontrado!' });
        } else {
            res.status(200).json(results[0]);
        }
    });
});


app.post('/usuarios', (req, res) => {                                               // Rota para criar um novo usuário
    const { nome, username, email, senha } = req.body;

    const query = 'INSERT INTO usuarios (nome, username, email, senha) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, username, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).send({ error: 'Erro no servidor' });
        } else {
            res.status(201).send({ message: 'Usuário criado com sucesso!' });
        }
    });
});


app.put('/usuarios/:id', (req, res) => {                                              // Rota para atualizar um usuário
    const { id } = req.params; 
    const { nome, username, email, senha } = req.body;

    const query = 'UPDATE usuarios SET nome = ?, username = ?, email = ?, senha = ? WHERE id = ?';
    db.query(query, [nome, username, email, senha, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).send({ error: 'Erro no servidor' });
        } else {
            res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
        }
    });
});


app.delete('/usuarios/:id', (req, res) => {                                             // Rota para deletar um usuário
    const { id } = req.params;

    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err);
            res.status(500).send({ error: 'Erro no servidor' });
        } else {
            res.status(200).send({ message: 'Usuário deletado com sucesso!' });
        }
    });
});


app.listen(PORT, () => {                                                                  // Inicia o servidor
    console.log(`Servidor rodando na porta ${PORT}`);
});
