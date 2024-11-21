const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Carrinho, Produto } = require('./db');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(cors());

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

// Pegar Produtos
// app.get('/produtos', async (req, res) => {
//   try {
//     const produtos = await Produto.findAll();
//     res.json(produtos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Pegar Carrinho
// app.post('/carrinho', async (req, res) => {
//   const { session_id, ProdutoID, Quantidade, ClienteID } = req.body;

//   try {
//     const carrinhoItem = await Carrinho.create({ session_id, ProdutoID, Quantidade, ClienteID });
//     res.json(carrinhoItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Pegar Sessao do carrinho
// app.get('/carrinho/:session_id', async (req, res) => {
//   const { session_id } = req.params;

//   try {
//     const carrinhoItem = await Carrinho.findAll({
//       where: { session_id },
//       include: [{ model: Produto }],
//     });
//     res.json(carrinhoItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`servidor rodando na porta http://localhost:${PORT}/`);
});