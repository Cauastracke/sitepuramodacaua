const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Puramoda', 'root', 'aluno123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false,
    }
  });

// Pegando Tabela Cliente para Sequelize
const Cliente = sequelize.define('Cliente', {
    ClienteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Nome: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    Email: {
        type: DataTypes.INTEGER,
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
      tableName: 'Clientes',
      timestamps: false // Caso você não tenha as colunas createdAt e updatedAt
  });

  // Pegando Tabela Produto para Sequelize
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

// Pegando Tabela Carrinho para Sequelize
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

// Pegando Tabela Pedido para Sequelize
const Pedido = sequelize.define('Pedido', {
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
        model: 'Cliente', // Name of the related table
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
  }, {
    tableName: 'Pedido', // Specify the table name explicitly
    timestamps: false // Assuming you don't have createdAt or updatedAt columns
  });
  
  // Optionally, you can set up associations with other models, e.g.:
  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Cliente, {
      foreignKey: 'ClienteID',
      onDelete: 'CASCADE'
    });
    Pedido.belongsTo(models.Carrinho, {
      foreignKey: 'CarrinhoID',
      onDelete: 'CASCADE'
    });
    Pedido.belongsTo(models.Cupom, {
      foreignKey: 'CupomID',
      onDelete: 'CASCADE'
    });
  };

  // Pegando Tabela PedidoProd para Sequelize
  const PedidoProd = sequelize.define('PedidoProd', {
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
  }, {
    tableName: 'PedidoProd', // Explicitly specify the table name
    timestamps: false // Assuming you don't need createdAt or updatedAt columns
  });
  
  // Optionally, define associations between `PedidoProd` and other models:
  PedidoProd.associate = (models) => {
    PedidoProd.belongsTo(models.Pedido, {
      foreignKey: 'PedidoID',
      onDelete: 'CASCADE'
    });
    PedidoProd.belongsTo(models.Produto, {
      foreignKey: 'ProdutoID',
      onDelete: 'CASCADE'
    });
    PedidoProd.belongsTo(models.Carrinho, {
      foreignKey: 'CarrinhoID',
      onDelete: 'CASCADE'
    });
  };

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
    Cliente,
    Produto,
    Carrinho,
    Pedido,
    PedidoProd,
    testConnection,
    syncDatabase
};