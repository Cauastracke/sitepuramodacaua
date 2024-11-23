const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Clientes, testConnection, syncDatabase } = require('./db');

const app = express();
const PORT = 3000;

// Configura o middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(express.static('public'));
app.use(express.json());
// app.use(cors());

// Testa a conexão com o banco de dados
testConnection();

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


//comeco dos html dos produtos
app.get('/calca-jeans-preta', (req, res) => {
  res.sendFile(__dirname + '/produto-calca-jeans-preta.html');
});
app.get('/cropped-preto-e-branco', (req, res) => {
  res.sendFile(__dirname + '/produto-cropped-preto-e-branco.html');
});
app.get('/vestido-azul', (req, res) => {
  res.sendFile(__dirname + '/produto-vestido-azul.html');
});
app.get('/saia-jeans', (req, res) => {
  res.sendFile(__dirname + '/produto-saia-jeans.html');
});
app.get('/vestido-de-verão', (req, res) => {
  res.sendFile(__dirname + '/produto-vestido-de-verão.html');
});
app.get('/vestido-azul-marinho', (req, res) => {
  res.sendFile(__dirname + '/produto-vestido-azul-marinho.html');
});
app.get('/short-jeans-flor', (req, res) => {
  res.sendFile(__dirname + '/produto-shorts-jeans-flor.html');
});
app.get('/cropped-frio-preto', (req, res) => {
  res.sendFile(__dirname + '/produto-cropped-frio-preto.html');
});
app.get('/cropped-de-amarração', (req, res) => {
  res.sendFile(__dirname + '/produto-cropped-de-amarração.html');
});
app.get('/jaqueta-cropped-branca', (req, res) => {
  res.sendFile(__dirname + '/produto-jaqueta-cropped-branca.html');
});
app.get('/calca-jeans-azul', (req, res) => {
  res.sendFile(__dirname + 'produto-calca-jeans-preta.html');
});
app.get('/vestido-rosa', (req, res) => {
  res.sendFile(__dirname + 'produto-vestido-rosa.html');
});
app.get('/cropped-preta', (req, res) => {
  res.sendFile(__dirname + 'produto-cropped-preta.html');
});
app.get('/short-jeans', (req, res) => {
  res.sendFile(__dirname + '/produto-shorts-jeans.html');
});
// Login e register

// Registro de usuário
app.post('/register', async (req, res) => {
  const { Nome, Email, Senha, Celular, Endereco } = req.body;

  try {

    // registrar novo usuario
    const novoCliente = await Clientes.create({ Nome, Email, Senha, Celular, Endereco });

    res.status(200).send({ message: 'Usuário registrado com sucesso', user: Clientes  });
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao registrar usuário');
  }
});

// Login do Cliente
app.post('/login', async (req, res) => {
  const { Email, Senha } = req.body;

  if (!Email || !Senha) {
    return res.status(400).send({ message: 'Email e senha são obrigatórios.' });
  }

  try {

    // achar email do cliente
    const cliente = await Clientes.findOne({ where: { Email } })

    if (!cliente)  {
      return res.status(400).send({ message: 'Cliente não encontrado' });
    }

    if (cliente.Senha === Senha) {
        res.status(200).send({ message: 'Login bem-sucedido!' });
    } else {
        res.status(400).send({ message: 'Senha incorreta' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao fazer login.' });
  }
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