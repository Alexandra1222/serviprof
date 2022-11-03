import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;


const ServiciosSchema = new Schema(

  {

    servicio: { type: String },
    nombre: { type: String },
    fecha: { type: String },
    descripcionServicio: { type: String },
    fotoServicio: {
      data: Buffer,
      contentType: String,
    },
  }
);

export default model('Servicios', ServiciosSchema);


//es foto servicio  porque tendria que que quedar un registro del servicio que se brindo
//lo proximo a agregar seria un estado en el que se encuentra el servicio, pendiente, en proceso ,terminado
//calificaciones las  estrellas que le dan los usuarios sobre la calidad del servicio
// comentarios que los usuarios pueden hacer sobre el servicio y el profesional que lo realizo




