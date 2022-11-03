import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import servicios from './routes/servicios.js';
import categoria from './routes/categoria.js';
import certificaciones from './routes/certificaciones.js';
import trabajos from './routes/trabajos.js';
/* import perfiles from './routes/perfiles.js'; */
/* import prestador from './routes/prestador.js'; */

const app = express()

app.use(cors())
app.use(morgan('dev'));
app.use(express.json())

//para probar si contesta desde el
app.get('/', (req, res) => {
    res.end('el servidor esta corriendo en el back')
})

//configuracion del servidor basico
app.listen(5000, function () {
    console.log('SERVIDOR CORRIENDO EN EL PUERTO 5000')
})

//cadena de conexion 
mongoose.connect('mongodb://localhost/serviprof')
const objetodb = mongoose.connection
objetodb.on('connected', () => { console.log('CONEXIÓN CORRECTA A MONGODB') })
objetodb.on('error', () => { console.log('UPS.. OCURRIO UN ERROR EN LA CONEXIÓN CON MONGODB') })

//importando las rutas


app.use('/api/v1/servicios', servicios);
app.use('/api/v1/categoria', categoria);
app.use('/api/v1/certificaciones', certificaciones);
app.use('/api/v1/trabajos', trabajos);
/* app.use('/api/v1/perfiles', perfiles); */
/* app.use('/api/v1/prestador', prestador); */
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))


