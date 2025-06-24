const mongoose = require('mongoose');


const tareaSchema = new mongoose.Schema({
  uid: { type: String, required: true },           
  categoria: { type: String, required: true },      
  subcategoria: String,                             
  institucion: String,
  curso: String,
  comentario: String,
  estado: { type: String, default: 'toDo' }         
}, {
  timestamps: true 
});


module.exports = mongoose.model('Tarea', tareaSchema);
