const express = require("express");
const router = express.Router();

const Vet = require("../models/Vet");

router.get("/", async (req, res) => {
    const vetList = await Vet.find();

    if (!vetList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(vetList);
});

router.get("/:id", async (req, res) => {
    const vet = await Vet.findById(req.params.id);

    if (!vet) {
        res.status(404).json({ message: "o veterinário com o id informado não foi encontrado!" });
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

    if (!vet) return resp.status(400).send("o veterinário não pode ser criado!");
    resp.send(vet);
});

router.put("/:id", async (req, res) => {
    const vet = await Vet.findByIdAndUpdate(
        req.params.id,
        {
            nome: req.body.nome,
            email: req.body.email,
            celular: req.body.celular,
            endereco: req.body.endereco,
            estado: req.body.estado,
        },
        {new: true}
    );
    if (!vet) return res.status(400).send("O veterinário não pode ser atualizado!");

    res.send(vet);
});

router.delete("/:id", (req, res) => {
    Vet.findByIdAndDelete(req.params.id).then((vet)=>{
        if(vet){
            return res.status(200).json({success: true, message: "O veterniário foi deletado!"});
        } else{
            return res.status(404).json({success: false, message: "o veterinário não foi encontrado!"});
        }
    }).catch((err)=>{
        return res.status(500).json({success: false, error: err});
    });
})

module.exports = router;