const mongoose = require("mongoose");
const Procedure = require("./Procedure");

const consultationSchema = new mongoose.Schema({
    Data: { type: Date, required: true }, //data da consulta
    valorTotal: { type: Number, required: true }, //valor total

    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true,
    },

    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vet",
        required: true,
    },
    //relacionamento muitos para muitos com os procedimentos

    procedures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Procedure",
            required: true,
        }
    ],
});

module.exports = mongoose.model("Consultas", consultationSchema);