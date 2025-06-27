
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();


app.use(cors());


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));


app.get('/', (req, res) => {
  res.send('🚀 Backend de ToDocente funcionando');
});

const Tarea = require('./models/tarea');


app.post('/api/tareas', async (req, res) => {
  try {
    
    const datos = req.body;

    
    const nuevaTarea = new Tarea({
      uid: datos.uid,
      categoria: datos.categoria,
      subcategoria: datos.subcategoria,
      institucion: datos.institucion,
      curso: datos.curso,
      comentario: datos.comentario,
      estado: datos.estado || "todo"
    });

    
    const tareaGuardada = await nuevaTarea.save();

   
    res.status(201).json(tareaGuardada);

  } catch (error) {
    
    console.error("Error al guardar tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get('/api/tareas/:uid', async (req, res) => {
  try {
    const uid = req.params.uid; 

   
    const tareas = await Tarea.find({ uid });

    res.json(tareas); 
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

app.delete('/api/tareas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Tarea.findByIdAndDelete(id);
    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

app.put('/api/tareas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const actualizada = await Tarea.findByIdAndUpdate(id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔊 Servidor escuchando en http://localhost:${PORT}`);
});
