const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Client = require("../models/Client");
const Pet = require("../models/Pet");

router.get('/', async (req, res) => {
    const petList = await Pet.find().populate("client");

    if (!petList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(petList);
});

router.get("/:id", async (req, res) => {
    const pet = await Pet.findById(req.params.id).populate("client");

    if (!pet) {
        res.status(404).json({ message: "o animal de estimação com o ID fornecido não foi encontrado." })
    }

    res.status(200.).send(pet);
})


router.post("/", async (req, res) => {
    const client = await Client.findById(req.body.client);
    if (!client) return res.status(404).send("Cliente inválido");

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

    if (!pet) return res.status(400).send("o pet não pode ser criado!");

    res.send(pet);
});

router.put("/:id", async (req, res) => {
    const client = await Client.findById(req.body.client);
    if (!client) return res.status(404).send("cliente não encontrado");

    const pet = await Pet.findByIdAndUpdate(
        req.params.id,
        {
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
            client: client,
        },
        {new: true} //retorna objeto atualizado
    );

    if(!pet) return res.status(400).send("o pet não pode ser atualizado!");

    res.send(pet);
});

router.delete("/:id", (req, res)=> {
    Pet.findByIdAndDelete(req.params.id).then((pet)=> {
        if(pet){
            return res.status(200).json({success: true, message: "o pet foi deletado!"});
        }else {
            return res.status(404).json({success: false, message: "pet não encontrado!"});
        }
    }).catch((err)=> {
        return res.status(500).json({success: false, error : err});
    });
        });

module.exports = router;