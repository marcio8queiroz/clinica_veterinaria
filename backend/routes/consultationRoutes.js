const express = require("express");
const router = express.Router();

const Consultation = require("../models/Consultation");
const Pet = require("../models/Pet");
const Vet = require("../models/Vet");
const Procedure = require("../models/Procedure");

router.post("/", async(req, res)=> {
    const pet = await Pet.findById(req.body.pet);
    const vet = await Vet.findById(req.body.vet);

    if(!pet) return res.status(400).send("Pet inválido");
    if(!vet) return res.status(400).send("Veterinário inválido");

    //verificar se existem procedimentos
    const procedures = await Procedure.find({
        _id: { $in: req.body.procedures},
    });
    if (procedures.length !== req.body.procedures.length){
        return res.status(400).send("Alguns procedimentos são inválidos!");
    }

    let consultation = new Consultation({
        Data: req.body.Data,
        valorTotal: req.body.valorTotal,
        pet: pet,
        vet: vet,
        procedures: req.body.procedures,
    });
    consultation = await consultation.save();

    if(!consultation)
        return res.status(400).send("A consulta não pode ser criada!")

    res.send(consultation);
})

module.exports = router;