const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    especie: { type: String, required: true}, 
    raca: { type: String, required: true}, //breed
    cor: { type: String, required: true},
    altura: { type: Number, required: true}, //height
    peso: { type: Number, required: true}, // weight
    sexo: { type: String, required: true}, //gender
    dataNascimento: { type: Date, required: true}, //birthDate
    pai: { type: String, required: true},
    mae: { type: String, required: true},
    observacoes: {type: String, required: true},

    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
});

module.exports = mongoose.model("Pet", petSchema);