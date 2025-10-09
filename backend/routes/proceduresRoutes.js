const express = require("express");
const router = express.Router();

const Procedure = require("../models/Procedure");

router.get('/', async(req, res)=>{
    const procedureList = await Procedure.find();

    if(!procedureList){
        res.status(500).json({success: false});
    }
    res.status(200).send(procedureList);
});

router.get("/:id", async(req, res)=>{
    const procedure = await Procedure.findById(req.params.id);

    if(!procedure){
        res.status(404).json({message: "O procedimento com o ID informado não foi encontrado!"})
    }
    res.status(200).send(procedure);
})

router.post("/", async (req, resp)=>{
    let procedure = new Procedure({
        nome: req.body.nome,
        preco: req.body.preco,
    });

    procedure = await procedure.save();

    if(!procedure)
        return resp.status(400).send("o procedimento não pode ser criado!");

    resp.send(procedure);
});

router.put("/:id", async(req, res)=>{
    const procedure = await Procedure.findByIdAndUpdate(
        req.params.id,
        {
         nome: req.body.nome,
         preco: req.body.preco,
        },
        {new: true}
    );

    if(!procedure)
        return res.status(400).send(("o procedimento não pode ser atualizado!"));
    res.send(procedure);
})

router.delete("/:id", async(req, res)=>{
    Procedure.findByIdAndDelete(req.params.id).then((procedure)=>{
        if(procedure){
            return res.status(200).json({success: true, message: "o procedimento foi deletado!"})
        } else{
            return res.status(404).json({success: false, message: "o procedimento não foi encontrado!"})
        }
    }).catch((err)=> {
        return res.status(500).json({success: false, erro: err});
    });      

});


module.exports = router;