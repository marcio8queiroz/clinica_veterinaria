const express = require("express");
const app = express();
const conn = require("./db/conn");

app.use(express.json());

app.get("/",(req, res) => {
res.send("teste curso");
});


app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
})