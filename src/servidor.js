const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verifica = require('./verificaLogin');
const usuario = require('./controladores/usuarios');
const produtos = require('./controladores/produtos');

const app = express();

app.use(express.json());

app.post('/usuario', usuarios.cadastrarUsuario);
app.post('/login',login.login);
app.use(verifica);
app.get('/usuario', usuario.detalharUsuario);
app.put('/usuario', usuario.atulizarUsuario);
app.post('/produtos', produtos.cadastrarProdutos);
app.get('/produtos', produtos.listarProdutos);
app.get('/produtos/:id', produtos.detalharProduto);
app.put('/produtos/:id', produtos.atualizarProduto);
app.delete('/produtos/:id', produtos.excluirProduto);


module.exports = app;