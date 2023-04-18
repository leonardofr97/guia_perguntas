const Sequelize = require("sequelize");
const connection = require("./database");

// Define o model para a criação da tabela perguntas
const Pergunta = connection.define("perguntas", {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Irá fazer a criação da tabela perguntas de acordo com o que foi definido no model
// force: false => não irá criar a tabela se esta já existir
Pergunta.sync({force: false}).then(() => {
    console.log("SUCESSO ao criar tabela Pergunta!");
});