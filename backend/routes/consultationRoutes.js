const express = require("express");
const router = express.Router();

const Consultation = require("../models/Consultation");
const Pet = require("../models/Pet");
const Vet = require("../models/Vet");
const Procedure = require("../models/Procedure");

router.get('/', async(req, res) => {
    const consultationList = await Consultation.find().populate("procedures")
    .populate("procedures")
    .populate("pet")
    .populate("vet");

    if(!consultationList){
        res.status(500).json({success: false});
    }
    res.status(200).send(consultationList);
});

router.get("/:id", async(req, res)=>{
    const consultation = await Consultation.findById(req.params.id)
    .populate("procedures")
    .populate("pet")
    .populate("vet");

    if(!consultation){
        res.status(404).json({message: "A consulta com o ID informado não foi encontrada"});
    }
    res.status(200).send(consultation);
})



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

router.delete("/:id", (req, res)=> {
    Consultation.findByIdAndDelete(req.params.id).then((consultation)=> {
        if(consultation){
            return res.status(200).json({success: true, message: "a consulta foi excluída" });
        } else{
            return res.status(404).json({success: false, message: "Consulta não encontrada!"});
        }
    }).catch((err)=>{
        return res.status(500).json({success: false, error: err});
    });
})

module.exports = router;