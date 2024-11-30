const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Puramoda', 'root', 'aluno123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false,
    }
  });

// Pegando Tabela Clientes para Sequelize
const Clientes = sequelize.define('Clientes', {
    ClienteID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Celular: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Endereco: {
        type: DataTypes.STRING,
        allowNull: false
      },
  });

  // Pegando Tabela Produto para Sequelize
const Produtos = sequelize.define('Produtos', {
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

// Pegando Tabela Carrinho para Sequelize
const Carrinhos = sequelize.define('Carrinhos', {
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
});

// Pegando Tabela CarrinhoItems para Sequelize
const CarrinhoItems = sequelize.define('CarrinhoItems', {
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
});

// Pegando Tabela Pedido para Sequelize
const Pedidos = sequelize.define('Pedidos', {
    PedidoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ClienteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes', // Name of the related table
        key: 'ClienteID'
      },
      onDelete: 'CASCADE'
    },
    CarrinhoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carrinho', // Name of the related table
        key: 'CarrinhoID'
      },
      onDelete: 'CASCADE'
    },
    CupomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cupom', // Name of the related table
        key: 'CupomID'
      },
      onDelete: 'CASCADE'
    },
    Data: {
      type: DataTypes.DATEONLY, // Using DATEONLY for the date format (YYYY-MM-DD)
      allowNull: false
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  
  // Optionally, you can set up associations with other models, e.g.:
  Pedidos.associate = (models) => {
    Pedido.belongsTo(models.Clientes, {
      foreignKey: 'ClienteID',
      onDelete: 'CASCADE'
    });
    Pedidos.belongsTo(models.Carrinhos, {
      foreignKey: 'CarrinhoID',
      onDelete: 'CASCADE'
    });
    Pedidos.belongsTo(models.Cupoms, {
      foreignKey: 'CupomID',
      onDelete: 'CASCADE'
    });
  };

  // Pegando Tabela PedidoProd para Sequelize
  const PedidoProds = sequelize.define('PedidoProds', {
    PedidoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Part of the composite primary key
      references: {
        model: 'Pedido', // Name of the related table
        key: 'PedidoID'
      },
      onDelete: 'CASCADE'
    },
    ProdutoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Part of the composite primary key
      references: {
        model: 'Produto', // Name of the related table
        key: 'ProdutoID'
      },
      onDelete: 'CASCADE'
    },
    CarrinhoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carrinho', // Name of the related table
        key: 'CarrinhoID'
      },
      onDelete: 'CASCADE'
    },
    Quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  // Optionally, define associations between `PedidoProd` and other models:
  PedidoProds.associate = (models) => {
    PedidoProds.belongsTo(models.Pedidos, {
      foreignKey: 'PedidoID',
      onDelete: 'CASCADE'
    });
    PedidoProds.belongsTo(models.Produtos, {
      foreignKey: 'ProdutoID',
      onDelete: 'CASCADE'
    });
    PedidoProds.belongsTo(models.Carrinhos, {
      foreignKey: 'CarrinhoID',
      onDelete: 'CASCADE'
    });
  };

  (async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Testa a conexão com o banco de dados
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco de dados!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

// Sincroniza os modelos com o banco de dados
async function syncDatabase() {
    try {
        await sequelize.sync();
        console.log('Tabelas sincronizadas com sucesso!');
    } catch (err) {
        console.error('Erro ao sincronizar as tabelas:', err);
    }
}

module.exports = {
    sequelize,
    Clientes,
    Produtos,
    Carrinhos,
    Pedidos,
    PedidoProds,
    testConnection,
    syncDatabase
};

Clientes.hasOne(Carrinhos);
Carrinhos.belongsTo(Clientes);
Carrinhos.hasMany(CarrinhoItems);
CarrinhoItems.belongsTo(Carrinhos);
CarrinhoItems.belongsTo(Produtos)