require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Verificar si la variable está bien cargada

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Conectado a MongoDB');
}).catch(err => {
  console.error('❌ Error de conexión a MongoDB:', err);
});

const app = express();
app.use(express.json());

// Modelo de ejemplo
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", UserSchema);

// Endpoint para obtener usuarios
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
