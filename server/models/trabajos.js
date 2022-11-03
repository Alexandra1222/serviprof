import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;


const TrabajosSchema = new Schema(

    {
        nombreTrabajo: { type: String },
        presupuesto: { type: String },
        descripcionTrabajo: { type: String },
        fotoTrabajo: {
            data: Buffer,
            contentType: String,
        },
    }
);

export default model('Trabajos', TrabajosSchema);
