import express from "express"
const router = express.Router()
import formidable from "formidable"
import fs from "fs"
import Trabajos from '../models/trabajos.js';

const CreateTrabajo = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        console.log("entrando al if de la verificacion de llenado de campos ");
        if (!fields.nombreTrabajo || !fields.presupuesto || !fields.descripcionTrabajo || !file.fotoTrabajo) {
            return res.status(400).json({ error: "tenes que c completar todos los campos" })
        }
        console.log("saliendo del if de la veriicacion");

        const trabajo = new Trabajos(fields)
        console.log("trabajo", trabajo);
        if (file.fotoTrabajo) {
            if (file.fotoTrabajo.size > 400000) {
                return res.status(400).json({ error: "file size is too big" })
            }
            trabajo.fotoTrabajo.data = fs.readFileSync(file.fotoTrabajo.filepath)
            trabajo.fotoTrabajo.contentType = file.fotoTrabajo.mimetype

            trabajo.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
            })
            res.json({ trabajo })
        }
    })

}


const GetTrabajos = (req, res) => {
    Trabajos.find((err, data) => {
        if (err) {
            return res.json({ error: err })
        }
        res.json(data)
    }
    )
}


const TrabajoFoto = (req, res) => {
    let id = req.params.trabajosId;
    Trabajos.findById(id).exec((err, trabajo) => {
        if (err || !trabajo) {
            res.status(400).json({ error: 'los datos no se encuentran ' })
        } else {
            if (trabajo.fotoTrabajo.data) {
                res.set('Content-Type', trabajo.fotoTrabajo.contentType)
                return res.send(trabajo.fotoTrabajo.data)
            }
        }

    })
}


const UpdateTrabajo = (req, res) => {
    let id = req.params.trabajosId;
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        Trabajos.findByIdAndUpdate(
            id,
            { $set: { ...fields } },
            { new: true },
            (err, trabajo) => {
                if (err) {
                    return res.status(400).json({ error: "ups, no se puede actualizar  el servicio" })
                }
                if (file.fotoTrabajo) {
                    if (file.fotoTrabajo.size > 100000) {
                        return res.status(400).json({ error: "el archivo es muy grande" })
                    }
                    trabajo.fotoTrabajo.data = fs.readFileSync(file.fotoTrabajo.filepath)
                    trabajo.fotoTrabajo.contentType = file.fotoTrabajo.mimetype

                    trabajo.save((err, result) => {
                        if (err) {
                            return res.status(400).json({ error: err })
                        }
                    })
                    res.json({ trabajo })
                    console.log("servicio despues de actualizado", trabajo);
                }

            }
        )
    })
}


const Deletetrabajo = async (req, res) => {
    const id = req.params.trabajosId;
    const del = await Trabajos.findByIdAndDelete(id)
    res.json(del)
}

router.post("/createTrabajo", CreateTrabajo)
router.get("/getTrabajos", GetTrabajos)
//
router.get('/photo/:trabajosId', TrabajoFoto)
router.put("/editarTrabajo/:trabajosId", UpdateTrabajo)
router.delete("/delete/:trabajosId", Deletetrabajo)




export default router