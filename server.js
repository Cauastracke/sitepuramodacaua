const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname)));

// Responde a pagina home
app.get("/", (req, res) => {
  res.sendFile(path.join (__dirname, '/home.html'));
});

// Responde a pagina dos produtos
app.get('/produtos', (req, res) => {
  res.sendFile(__dirname + '/produtos.html');
});

// Responde a pagina dos produtos
app.get('/produto-individual', (req, res) => {
  res.sendFile(__dirname + '/produto-individual-template.html');
});

// Responde a pagina do carrinho
app.get('/carrinho', (req, res) => {
  res.sendFile(__dirname + '/carrinho.html');
});

// Responde a pagina do checkout
app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/checkout.html');
});

// Páagina 404
app.get('/404', (req, res) => {
  res.sendFile(__dirname + '/404.html');
});

// Responde a pagina register
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Responde a pagina login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Responde a pagina perfil
app.get('/perfil', (req, res) => {
  res.sendFile(__dirname + '/perfil.html');
});

app.listen(PORT, () => {
  console.log(`servidor rodando na porta http://localhost:${PORT}/`);
});