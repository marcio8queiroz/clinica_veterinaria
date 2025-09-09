const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Client = require("../models/Client");
const Pet = require("../models/Pet");

router.post("/", async (req, res)=> {
    const client = await Client.findById(req.body.client);
    if(!client) return res.status(404).send("Cliente inválido");

    let pet = new Pet({
        nome: req.body.nome,
        especie: req.body.especie,
        raca: req.body.raca,
        cor: req.body.cor,
        altura: req.body.altura,
        peso: req.body.peso,
        sexo: req.body.sexo,
        dataNascimento: req.body.dataNascimento,
        pai: req.body.pai,
        mae: req.body.mae,
        observacoes: req.body.observacoes,
        client,
    });
    pet = await pet.save();

    if(!pet) return res.status(400).send("o pet não pode ser criado!");

    res.send(pet);
});

module.exports = router;