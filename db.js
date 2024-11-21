const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Puramoda', 'root', 'aluno123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false,
    }
  });

const Produto = sequelize.define('Produto', {
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Tamanho: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
});

const Carrinho = sequelize.define('Carrinho', {
  ProdutoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  ClienteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  session_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

Produto.sync();
Carrinho.sync();

module.exports = { sequelize, Produto, Carrinho };