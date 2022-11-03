import express from "express"
const router = express.Router()
import formidable from "formidable"
import fs from "fs"
import Servicios from '../models/servicios.js';

const CreateServicio = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        console.log("entrando al if de la verificacion de llenado de campos ");
        if (!fields.servicio || !fields.nombre || !fields.fecha || !fields.descripcionServicio || !file.fotoServicio) {
            return res.status(400).json({ error: "tenes que c completar todos los campos" })
        }
        console.log("saliendo del if de la veriicacion");

        const servicio = new Servicios(fields)
        console.log("servicio", servicio);
        if (file.fotoServicio) {
            if (file.fotoServicio.size > 400000) {
                return res.status(400).json({ error: "file size is too big" })
            }
            servicio.fotoServicio.data = fs.readFileSync(file.fotoServicio.filepath)
            servicio.fotoServicio.contentType = file.fotoServicio.mimetype

            servicio.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
            })
            res.json({ servicio })
        }
    })

}


const GetServicios = (req, res) => {
    Servicios.find((err, data) => {
        if (err) {
            return res.json({ error: err })
        }
        res.json(data)
    }
    )
}


const ServicioFoto = (req, res) => {
    let id = req.params.serviciosId;
    Servicios.findById(id).exec((err, servicio) => {
        if (err || !servicio) {
            res.status(400).json({ error: 'los datos no se encuentran ' })
        } else {
            if (servicio.fotoServicio.data) {
                res.set('Content-Type', servicio.fotoServicio.contentType)
                return res.send(servicio.fotoServicio.data)
            }
        }

    })
}


const UpdateServicio = (req, res) => {
    let id = req.params.serviciosId;
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        Servicios.findByIdAndUpdate(
            id,
            { $set: { ...fields } },
            { new: true },
            (err, servicio) => {
                if (err) {
                    return res.status(400).json({ error: "ups, no se puede actualizar  el servicio" })
                }
                if (file.fotoServicio) {
                    if (file.fotoServicio.size > 100000) {
                        return res.status(400).json({ error: "el archivo es muy grande" })
                    }
                    servicio.fotoServicio.data = fs.readFileSync(file.fotoServicio.filepath)
                    servicio.fotoServicio.contentType = file.fotoServicio.mimetype

                    servicio.save((err, result) => {
                        if (err) {
                            return res.status(400).json({ error: err })
                        }
                    })
                    res.json({ servicio })
                    console.log("servicio despues de actualizado", servicio);
                }

            }
        )
    })
}


const Deleteservicio = async (req, res) => {
    const id = req.params.serviciosId;
    const del = await Servicios.findByIdAndDelete(id)
    res.json(del)
}

router.post("/createServicio", CreateServicio)
router.get("/getServicios", GetServicios)
//
router.get('/photo/:serviciosId', ServicioFoto)
router.put("/editarServicios/:serviciosId", UpdateServicio)
router.delete("/delete/:serviciosId", Deleteservicio)




export default router