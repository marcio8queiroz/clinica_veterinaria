const express = require("express");
const router = express.Router();

const Vet = require("../models/Vet");

router.get("/", async(req, res) => {
    const vetList = await Vet.find();

    if(!vetList) {
        res.status(500).json({success: false});
    }
    res.status(200).send(vetList);
});

router.get("/:id", async(req, res)=> {
    const vet = await Vet.findById(req.params.id);

    if(!vet){
        res.status(404).json({message: "o veterinário com o id informado não foi encontrado!"});
    }
    res.status(200).send(vet);
});

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