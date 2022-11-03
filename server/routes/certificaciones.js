import express from "express"
const router = express.Router()
import formidable from "formidable"
import fs from "fs"
import Certificaciones from '../models/certificaciones.js';



const CreateCertificacion = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        console.log("entrando al if de la verificacion de llenado de campos ");
        if (!fields.nombreCertificacion || !fields.fechasAlta || !fields.fechaCaducidad || !fields.entidadCertificante || !file.fotoCertificacion) {
            return res.status(400).json({ error: "tenes que c completar todos los campos" })
        }
        console.log("saliendo del if de la veriicacion");

        const certificacion = new Certificaciones(fields)
        console.log("certificacion", certificacion);
        if (file.fotoCertificacion) {
            if (file.fotoCertificacion.size > 400000) {
                return res.status(400).json({ error: "file size is too big" })
            }
            certificacion.fotoCertificacion.data = fs.readFileSync(file.fotoCertificacion.filepath)
            certificacion.fotoCertificacion.contentType = file.fotoCertificacion.mimetype

            certificacion.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
            })
            res.json({ certificacion })
        }
    })

}

const GetCertificaciones = (req, res) => {
    Certificaciones.find((err, data) => {
        if (err) {
            return res.json({ error: err })
        }
        res.json(data)
    }
    )
}

const CertificacionesFoto = (req, res) => {
    let id = req.params.certificacionesId;
    Certificaciones.findById(id).exec((err, certificacion) => {
        if (err || !certificacion) {
            res.status(400).json({ error: 'los datos no se encuentran ' })
        } else {
            if (certificacion.fotoCertificacion.data) {
                res.set('Content-Type', certificacion.fotoCertificacion.contentType)
                return res.send(certificacion.fotoCertificacion.data)
            }
        }

    })
}



const UpdateCertificacion = (req, res) => {
    let id = req.params.certificacionesId;
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        Certificaciones.findByIdAndUpdate(
            id,
            { $set: { ...fields } },
            { new: true },
            (err, certificacion) => {
                if (err) {
                    return res.status(400).json({ error: "ups, no se puede actualizar  el servicio" })
                }
                if (file.fotoCertificacion) {
                    if (file.fotoCertificacion.size > 100000) {
                        return res.status(400).json({ error: "el archivo es muy grande" })
                    }
                    certificacion.fotoCertificacion.data = fs.readFileSync(file.fotoCertificacion.filepath)
                    certificacion.fotoCertificacion.contentType = file.fotoCertificacion.mimetype

                    certificacion.save((err, result) => {
                        if (err) {
                            return res.status(400).json({ error: err })
                        }
                    })
                    res.json({ certificacion })
                    console.log("servicio despues de actualizado", certificacion);
                }

            }
        )
    })
}

const DeleteCertificacion = async (req, res) => {
    const id = req.params.certificacionesId;
    const del = await Certificaciones.findByIdAndDelete(id)
    res.json(del)
}






//
router.post("/addCertificacion", CreateCertificacion)
router.get("/getCertificaciones", GetCertificaciones)

//
router.get('/photo/:certificacionesId', CertificacionesFoto)
router.put("/editarCertificacion/:certificacionesId", UpdateCertificacion)
router.delete("/delete/:certificacionesId", DeleteCertificacion)

export default router