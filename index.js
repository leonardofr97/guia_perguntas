const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
// Database
connection
    .authenticate()
    .then( () => {
        console.log("SUCESSO ao conectar ao banco de dados!");
    })
    .catch( (msgErro) => {
        console.error("ERRO ao conectar ao banco de dados: " + msgErro);
    })


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
    let nome = req.params.nome;
    let lang = req.params.lang;
    let exibirMsg = false;

    let produtos = [
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

    // findAll faz um select buscando todos os registros de determinada tabela e guarda em um array, raw true guarda no array somente os dados das colunas dos registros
    // order => serve para definir uma regra de ordenação, funciona como um ORDER BY
    Pergunta.findAll({ raw: true, order: [
        ["id", "DESC"] // ASC = Crescente, DESC = Decrescente
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {

    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {

    // 'titulo' e 'descricao' foram definidos no atributo 'name' dos inputs do form no HTML
    // Capturando os dados inputados no formulario
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    // create faz a criação do registro na tabela perguntas no DB, basicamente faz uma operação de insert
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;
    // faz o select de apenas um registro de acordo com a regra de busca
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {

        if (pergunta != undefined) {

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ["id", "DESC"]
                ]
            }).then(respostas => {

                let temRespostas = (respostas.length > 0);

                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas,
                    temRespostas: temRespostas
                });
            });

        } else { // se não achar a pergunta do id passado via GET no banco, redireciona para o index
            res.redirect("/");
        }
    });
});

app.post("/salvaresposta/:perguntaId", (req, res) => {
    let descricao = req.body.descricao;
    let perguntaId = req.params.perguntaId;
    Resposta.create({
        descricao: descricao,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});