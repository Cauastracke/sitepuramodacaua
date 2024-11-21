const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Puramoda', 'root', 'aluno123', {
    host: 'localhost',
    dialect: 'mysql',
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
    Preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });   