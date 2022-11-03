import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;



const CertificacionesSchema = new Schema(
    {
        nombreCertificacion: { type: String },
        fechasAlta: { type: String },
        fechaCaducidad: { type: String },
        entidadCertificante: { type: String },
        fotoCertificacion: {
            data: Buffer,
            contentType: String,
        },
    }
);

export default model('Certificaciones', CertificacionesSchema);
