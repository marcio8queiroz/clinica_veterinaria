const  mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    celular: {type: String, required: true},
    endereco: {type: String, required: true},
    estado: { type: String, required: true},
});

module.exports = mongoose.model("Client", clientSchema);