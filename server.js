const express = require("express");
const mongoose = require("mongoose");
const Grupo = require('./models/Grupo'); // Importar el modelo
const cors = require('cors');

require("dotenv").config();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// 
app.get("/grupos", async (req, res) => {
  try {
    const grupos = await Grupo.find(); // Obtener todos los grupos
    res.json(grupos);
  } catch (error) {
    console.error('Error al obtener los grupos:', error);
    res.status(500).json({ error: 'Error al obtener los grupos' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
