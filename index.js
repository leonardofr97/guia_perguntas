const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// Express vai usar o EJS como view engine
app.set("view engine", "ejs");

// Para a aplicação aceitar arquivos estaticos que deverão estar em uma pasta com o nome "public" (arquivos de img, css ...)
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {

    /*
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-Cola", preco: 5.5},
        {nome: "Leite", preco: 4.29}
    ];
    */

    // Desta forma, o render irá buscar o arquivo html (.ejs) index SEMPRE dentro da pasta views (os htmls da app TEM que estar lá)
    /*
    res.render("index", { // Dados que podemos capturar no html
        nome: nome,
        lang: lang,
        empresa: "VASP",
        inscritos: 8040,
        msg: exibirMsg,
        produtos: produtos
    });
    */

    res.render("index");
});

app.get("/perguntar", (req, res) => {

    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {

    // 'titulo' e 'descricao' foram definidos no atributo 'name' dos inputs do form no HTML
    // Capturando os dados inputados no formulario
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send("Pergunta salva! <br> Titulo: " + titulo + "<br> Descrição: " + descricao);
});

app.listen(8080, () => {
    console.log("App rodando!");
});