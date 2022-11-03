import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;



const PerfilesSchema = new Schema(
  {
    nombre: { type: String },
    apellido: { type: String },
    password: { type: String },
    telefono: { type: String },
    fotoPerfil: {
      data: Buffer,
      contentType: String,
    },
  }
);

export default model('Perfiles', PerfilesSchema);
