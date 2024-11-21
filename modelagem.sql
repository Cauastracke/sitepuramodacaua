CREATE DATABASE Puramoda;

CREATE TABLE Cliente (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(20) NOT NULL,
    Celular VARCHAR(20) NOT NULL,
    Endereco VARCHAR(100) NOT NULL
);

CREATE TABLE Produto (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao VARCHAR(255) NOT NULL,
    Tipo VARCHAR(20)
    Tamanho VARCHAR(4) NOT NULL,
    Preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Cupom (
    CupomID INT AUTO_INCREMENT PRIMARY KEY,
    Cupom VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Carrinho (
    CarrinhoID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID) ON DELETE CASCADE
);

CREATE TABLE `Pedido` (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    CarrinhoID INT,
    CupomID INT,
    Data DATE NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID) ON DELETE CASCADE,
    FOREIGN KEY (CarrinhoID) REFERENCES Carrinho(CarrinhoID) ON DELETE CASCADE,
    FOREIGN KEY (CupomID) REFERENCES Cupom(CupomID) ON DELETE CASCADE
);

CREATE TABLE PedidoProd (
    PedidoID INT,
    ProdutoID INT,
    CarrinhoID INT,
    Quantidade INT NOT NULL,
    PRIMARY KEY (PedidoID, ProdutoID),
    FOREIGN KEY (PedidoID) REFERENCES `Pedido`(PedidoID) ON DELETE CASCADE,
    FOREIGN KEY (ProdutoID) REFERENCES Produto(ProdutoID) ON DELETE CASCADE,
    FOREIGN KEY (CarrinhoID) REFERENCES Carrinho(CarrinhoID) ON DELETE CASCADE
);

CREATE TABLE CarrinhoItems (
    CarrinhoItemsID INT AUTO_INCREMENT PRIMARY KEY,
    CarrinhoID INT,
    ProdutoID INT,
    Quantidade INT NOT NULL,
    FOREIGN KEY (CarrinhoID) REFERENCES Carrinho(CarrinhoID) ON DELETE CASCADE,
    FOREIGN KEY (ProdutoID) REFERENCES Produto(ProdutoID) ON DELETE CASCADE,
    UNIQUE (CarrinhoID, ProdutoID)
);

INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Top Faixa Branco', 'Top faixa em malha elástica, com ajuste confortável ao corpo e detalhe franzido que traz charme ao design. Ideal para looks casuais ou combinações mais ousadas, versátil e elegante. Perfeito para usar com jeans, saias ou sobreposições.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Cropped Preto', 'Cropped de malha canelada, com decote coração e laço frontal, ideal para looks modernos e elegantes. Modelagem ajustada e confortável, perfeito para combinar com peças de cintura alta.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Vestido Halter Azul', 'Este vestido estilo halter em azul marinho combina elegância e simplicidade. O decote halter valoriza os ombros e o pescoço, proporcionando um ar sofisticado. A saia evasê traz movimento e leveza ao look, criando um caimento suave e fluido. Ideal para eventos diurnos e noturnos, pode ser combinado com sandálias ou saltos para um visual mais refinado.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Blusas Caneladas', 'Blusas Caneladas de Gola Alta: Conjunto de três blusas caneladas sem mangas, com gola alta, disponíveis nas cores branca, preta e marrom. Essenciais para o guarda-roupa, essas peças são versáteis e elegantes, ideais para combinar com acessórios e criar visuais desde casuais até mais sofisticados.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Vestido Midi Preto', 'Com um design clássico e atemporal, este vestido midi preto é a peça curinga para diversas ocasiões. As alças finas e ajustáveis proporcionam um ajuste personalizado e delicado. O corpo do vestido é levemente ajustado, enquanto a saia desce fluida e elegante. Ideal para combinar com acessórios discretos ou ousados, pode ser usado tanto em eventos casuais quanto em ocasiões especiais.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Top Tomara-que-Caia Bege e Preto', 'Top Tomara-que-Caia Bege e Preto: Um conjunto de tops tomara-que-caia, disponíveis nas cores bege e preto. Feitos em material elástico para um ajuste confortável, são perfeitos para compor looks modernos e minimalistas. Fáceis de combinar com calças de cintura alta e saias.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Blusas de Manga Curta em Preto e Cinza', 'Blusas de Manga Curta em Preto e Cinza: Conjunto de duas blusas de manga curta em cores neutras, preto e cinza. As peças têm um corte ajustado e minimalista, com em decote nas costas, proporcionando conforto e versatilidade. Podem ser combinadas facilmente com jeans ou saias para um visual casual e elegante.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Top Verde Musgo de Alça Fina com Amarração no Pescoço', 'Top Verde Musgo de Alça Fina com Amarração no Pescoço: Top estilo cropped na cor verde musgo, com alças finas que se amarram atrás do pescoço, proporcionando um visual moderno e feminino. O tecido leve e o detalhe franzido na parte da frente trazem charme e delicadeza à peça, ideal para dias quentes e combinações descontraídas.', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);
INSERT INTO Produto(Nome, Descricao, Preco) VALUES ('Calça azul', 'Teste', 59.99);