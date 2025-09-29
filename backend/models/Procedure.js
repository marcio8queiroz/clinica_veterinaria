const mongoose = require("mongoose");

const procedureSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    preco: {type: Number, required: true},
});

module.exports = mongoose.model("Procedure", procedureSchema);