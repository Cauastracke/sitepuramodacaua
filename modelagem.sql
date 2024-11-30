CREATE DATABASE puramoda;
USE puramoda;

CREATE TABLE Clientes (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    CarrinhoID INT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(20) NOT NULL,
    Celular VARCHAR(20) NOT NULL,
    Endereco VARCHAR(100) NOT NULL
     FOREIGN KEY (CarrinhoID) REFERENCES Carrinhos(CarrinhoID),
);

CREATE TABLE Produtos (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao VARCHAR(255) NOT NULL,
    Tipo VARCHAR(20),
    Tamanho VARCHAR(4) NOT NULL,
    Preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Cupoms (
    CupomID INT AUTO_INCREMENT PRIMARY KEY,
    Cupom VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Carrinhos (
    CarrinhoID INT AUTO_INCREMENT PRIMARY KEY,
    ProdutoID INT,
    ClienteID INT,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID)
);

CREATE TABLE CarrinhoItems (
    CarrinhoItemsID INT AUTO_INCREMENT PRIMARY KEY,
    CarrinhoID INT,
    ProdutoID INT,
    Quantidade INT NOT NULL,
    FOREIGN KEY (CarrinhoID) REFERENCES Carrinhos(CarrinhoID) ON DELETE CASCADE,
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID) ON DELETE CASCADE,
    UNIQUE (CarrinhoID, ProdutoID)
);

CREATE TABLE `Pedidos` (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    CarrinhoID INT,
    CupomID INT,
    Data DATE NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID) ON DELETE CASCADE,
    FOREIGN KEY (CarrinhoID) REFERENCES Carrinhos(CarrinhoID) ON DELETE CASCADE,
    FOREIGN KEY (CupomID) REFERENCES Cupoms(CupomID) ON DELETE CASCADE
);

CREATE TABLE PedidoProds (
    PedidoID INT,
    ProdutoID INT,
    CarrinhoID INT,
    Quantidade INT NOT NULL,
    PRIMARY KEY (PedidoID, ProdutoID),
    FOREIGN KEY (PedidoID) REFERENCES `Pedidos`(PedidoID) ON DELETE CASCADE,
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID) ON DELETE CASCADE,
    FOREIGN KEY (CarrinhoID) REFERENCES Carrinhos(CarrinhoID) ON DELETE CASCADE
);



INSERT INTO Produtos(Nome, Descricao, Tipo, Tamanho, Preco) VALUES
('Calça azul', 'Teste', 'Calça', 'M', 59.99);