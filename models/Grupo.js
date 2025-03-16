const mongoose = require("mongoose");

const GrupoSchema = new mongoose.Schema({
  nombre: String,
  dias: [String],
  hora: String,
  participantes: [String],
  id: String
});

const Grupo = mongoose.model("Grupo", GrupoSchema, "grupos");
module.exports = Grupo;
