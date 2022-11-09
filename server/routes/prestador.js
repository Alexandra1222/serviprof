import express from "express"
const router = express.Router()
import formidable from "formidable"
import fs from "fs"
import Prestadores from '../models/prestador.js';


const CreatePrestador = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        console.log("entrando al if de la verificacion de llenado de campos ");
        if (!fields.nombrePrestador || !fields.dni || !fields.fechaNacimiento || !fields.sexo || !fields.numeroTelefono || !file.fotoPerfil) {
            return res.status(400).json({ error: "tenes que  completar todos los campos" })
        }
        console.log("saliendo del if de la veriicacion");

        const prestador = new Prestadores(fields)
        console.log("prestador", prestador);
        if (file.fotoPerfil) {
            if (file.fotoPerfil.size > 400000) {
                return res.status(400).json({ error: "file size is too big" })
            }
            prestador.fotoPerfil.data = fs.readFileSync(file.fotoPerfil.filepath)
            prestador.fotoPerfil.contentType = file.fotoPerfil.mimetype

            prestador.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
            })
            res.json({ prestador })
        }
    })

}


const GetPrestadores = (req, res) => {
    Prestadores.find((err, data) => {
        if (err) {
            return res.json({ error: err })
        }
        res.json(data)
    }
    )
}

const PrestadorFoto = (req, res) => {
    let id = req.params.prestadoresId;
    Prestadores.findById(id).exec((err, prestador) => {
        if (err || !prestador) {
            res.status(400).json({ error: 'los datos no se encuentran ' })
        } else {
            if (prestador.fotoPerfil.data) {
                res.set('Content-Type', prestador.fotoPerfil.contentType)
                return res.send(prestador.fotoPerfil.data)
            }
            
        }

    })
}


const UpdatePrestador = (req, res) => {
    let id = req.params.prestadoresId;
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        Prestadores.findByIdAndUpdate(
            id,
            { $set: { ...fields } },
            { new: true },
            (err, prestador) => {
                if (err) {
                    return res.status(400).json({ error: "ups, no se puede actualizar  el prestadr" })
                }
                if (file.fotoPerfil) {
                    if (file.fotoPerfil.size > 100000) {
                        return res.status(400).json({ error: "el archivo es muy grande" })
                    }
                    prestador.fotoPerfil.data = fs.readFileSync(file.fotoPerfil.filepath)
                    prestador.fotoPerfil.contentType = file.fotoPerfil.mimetype

                    prestador.save((err, result) => {
                        if (err) {
                            return res.status(400).json({ error: err })
                        }
                    })
                    res.json({ prestador })
                    console.log("prestador despues de  ser actualizado", prestador);
                }

            }
        )
    })
}

const DeletePrestador = async (req, res) => {
    const id = req.params.prestadoresId;
    const del = await Prestadores.findByIdAndDelete(id)
    res.json(del)
}




router.post("/createprestador", CreatePrestador);
router.get("/getprestadores", GetPrestadores)
//
router.get("/photo/:prestadoresId", PrestadorFoto)
router.put("/editarprestador/:prestadoresId", UpdatePrestador)
router.delete("/delete/:prestadoresId", DeletePrestador)



export default router