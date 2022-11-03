import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;


const CategoriaSchema = new Schema(
  {
    nombre: { type: String },
    descripcion: { type: String }
  }
);

export default model('Categoria', CategoriaSchema);


