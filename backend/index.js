const express = require("express");
const app = express();
const conn = require("./db/conn");

//tornar o servidor acessível
const cors = require("cors");
app.use(cors());

//para usar o .env
require("dotenv/config");

//analise dos dados que vem nas requisiçoes HTTP
const bodyParser = require("body-parser")

const morgan = require("morgan")

app.use(express.json());

// app.get("/",(req, res) => {
// res.send("teste curso");
// });

//receber e enviar como json
app.use(bodyParser.json());
app.use(morgan("tiny"));

const clientsRoutes = require("./routes/clientsRoute")
const petsRoutes = require("./routes/petsRoute");
const vetsRoutes = require("./routes/vetsRoutes");
const api = process.env.API_URL || "/api/v1";
app.use(`${api}/clients`, clientsRoutes);
app.use(`${api}/pets`, petsRoutes);
app.use(`${api}/vets`, vetsRoutes);


app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
})