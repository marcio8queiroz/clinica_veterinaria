const express = require("express");
const router = express.Router();

const Client = require("../models/Client");

router.get("/", async(req, resp) => {
   // resp.status(200).send("Chegou em clientes");

   const clientList = await Client.find();

   if(!clientList) {
        resp.status(500).json({success: false});
   }
    resp.status(200).send(clientList);

});

router.get("/:id", async (req, res) => {
    const client = await Client.findById(req.params.id)

    if(!client){
        res.status(404).json({message: "O cliente com o id fornecido não foi encontrado"});
    }
    res.status(200).send(client);
})

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
    });

    router.put("/:id", async(req, res) => {
        const client = await Client.findByIdAndUpdate(req.params.id,
            {
                nome: req.body.nome,
                email: req.body.celular,
                endereco: req.body.endereco,
                estado: req.body.estado,
            },
            {new: true}
        );

        if (!client) return res.status(400).send("O cliente não pode ser atualizado!");

        res.send(client);
    });

    router.delete("/:id", (req, res) => {
        Client.findByIdAndDelete(req.params.id).then((client)=> {
            if(client){
                return res.status(200).json({success: true, message: "O cliente foi excluído!"});
            } else{
                return res.status(404.).json({success: false, message: "cliente não encontrado!"});
            }
        }).catch((err) => {
            return res.status(500).json({success: false, error: err});
        });
    });

module.exports = router;