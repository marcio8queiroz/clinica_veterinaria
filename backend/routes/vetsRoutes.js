const express = require("express");
const router = express.Router();

const Vet = require("../models/Vet");

router.post("/", async (req, resp) => {
    let vet = new Vet({
        nome: req.body.nome,
        email: req.body.email,
        celular: req.body.celular,
        endereco: req.body.endereco,
        estado: req.body.estado,
    });
    vet = await vet.save();

    if (!vet) return resp.status(400).send("o veterinário não pode ser criadoo!");
    resp.send(vet);
});

module.exports = router;