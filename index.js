const express = require("express");
const app = express();

// Express vai usar o EJS como view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {

    let nome = "Leonardo";
    let lang = "Javascript";

    // Desta forma, o render irá buscar o arquivo html (.ejs) index SEMPRE dentro da pasta views (os htmls da app TEM que estar lá)
    res.render("index", { // Dados que podemos capturar no html
        nome: nome,
        lang: lang,
        empresa: "VASP",
        inscritos: 8040
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});