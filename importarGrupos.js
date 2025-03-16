require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Grupo = require("./models/Grupo");

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync("pinlates_export.json", "utf-8"));

// Función para importar los datos
const importarGrupos = async () => {
  try {
    await Grupo.deleteMany(); // Borra los datos existentes
    await Grupo.insertMany(Object.values(data.grupos)); // Inserta los datos del JSON
    console.log("✅ Grupos importados correctamente");
  } catch (error) {
    console.error("❌ Error al importar grupos:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar la importación
importarGrupos();
