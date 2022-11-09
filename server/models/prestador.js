import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;


const PrestadoresSchema = new Schema(

    {
        nombrePrestador: { type: String },
        dni: { type: String },
        fechaNacimiento: { type: String },
        sexo: { type: String },
        numeroTelefono: { type: String },
        fotoPerfil: {
            data: Buffer,
            contentType: String,
        }
    }
);

export default model('Prestadores', PrestadoresSchema);


