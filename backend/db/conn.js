const mongoose = require("mongoose")

async function main(){
    await mongoose.connect("mongodb://localhost:27017/clinica-veterinaria")
    console.log("conectou ao Mongoose");
}

main().catch((err) => console.log(err));

module.exports = mongoose;