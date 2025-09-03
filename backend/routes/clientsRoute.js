const express = require("express");
const router = express.Router();

const Client = require("../models/Client");

router.get("/", async(req, resp) => {
    resp.status(200).send("Chegou em clientes");
});

router.post("/", async(req, res)=>{
    let client = new Client({
        nome: req.body.nome,
        email: req.body.email,
        celular: req.body.celular,
        endereco: req.body.endereco,
        estado: req.body.estado

    });
    client = await client.save();

    if(!client) return res.status(400).send("O cliente não pode ser salvo")
    res.send(client);
    })

module.exports = router;