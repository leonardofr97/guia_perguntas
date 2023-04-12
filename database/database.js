const Sequelize = require("sequelize");

// abrindo uma conexão com o servidor Mysql da maquina local
// Parametros:
// database, usuário, senha, obj com host e o SGBD usado (no caso Mysql)
const database = "guiaperguntas", usuario = "root", password = "0wR79!G$22D#", dadosConexao = {host: "localhost", dialect: "mysql"};

const connection = new Sequelize(database, usuario, password, dadosConexao);

module.exports = connection;