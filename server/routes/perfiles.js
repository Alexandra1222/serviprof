import express from "express"
const router = express.Router()
import formidable from "formidable"
import fs from "fs"
import Perfiles from '../models/perfiles.js';


const CreateProfile = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, file) => {
    console.log("entrando al  if de la comprobacion si existe algun  error")
    if (err) {
      return res.status(400).json({ error: err })
    }
    console.log("entrando al if de la verificacion de llenado de campos ");
    if (!fields.nombre || !fields.apellido || !fields.password || !fields.telefono || !file.fotoPerfil) {
      return res.status(400).json({ error: "Debes completar todos los campos por favor" })
    }
    console.log("saliendo del if de la veriicacion");
    const perfil = new Perfiles(fields)
    console.log("perfil", perfil);
    if (file.fotoPerfil) {
      if (file.fotoPerfil.size > 400000) {
        return res.status(400).json({ error: "el archivo es muy grande" })
      }
      console.log("perfil", perfil);
      perfil.fotoPerfil.data = fs.readFileSync(file.fotoPerfil.filepath)
      perfil.fotoPerfil.contentType = file.fotoPerfil.mimetype

      perfil.save((err, result) => {
        console.log('entrando en el save de perfil ')
        if (err) {
          return res.status(400).json({ error: err })
        }
        console.log('guarda la nueva perfil')
      })
      console.log('guarda la nueva perfil')
      return res.json({ perfil })
    }
  })
  console.log('despues de haber guardado el perfil ')

}


const GetPerfiles = (req, res) => {
  Perfiles.find((err, data) => {
    if (err) {
      return res.json({ error: err })
    }
    res.json(data)
  }
  )
}

const PerfilFoto = (req, res) => {
  let id = req.params.perfilesId;
  Perfiles.findById(id).exec((err, perfil) => {
    if (err || !perfil) {
      res.status(400).json({ error: 'los datos no se encuentran ' })
    } else {
      if (perfil.fotoPerfil.data) {
        res.set('Content-Type', perfil.fotoPerfil.contentType)
        return res.send(perfil.fotoPerfil.data)
      }
    }

  })
}


const UpdatePerfil = (req, res) => {
  let id = req.params.perfilesId;
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    Perfiles.findByIdAndUpdate(
      id,
      { $set: { ...fields } },
      { new: true },
      (err, perfil) => {
        if (err) {
          return res.status(400).json({ error: "ups, no se puede actualizar  el perfil" })
        }
        if (file.fotoPerfil) {
          if (file.fotoPerfil.size > 100000) {
            return res.status(400).json({ error: "el archivo es muy grande" })
          }
          perfil.fotoPerfil.data = fs.readFileSync(file.fotoPerfil.filepath)
          perfil.fotoPerfil.contentType = file.fotoPerfil.mimetype

          perfil.save((err, result) => {
            if (err) {
              return res.status(400).json({ error: err })
            }
          })
          res.json({ perfil })
        }

      }
    )
  })
}

const DeletePerfil = async (req, res) => {
  const id = req.params.perfilesId;
  const del = await Perfiles.findByIdAndDelete(id)
  res.json(del)
}




//
router.post("/createProfile", CreateProfile)
router.get("/get", GetPerfiles)

//
router.get('/photo/:perfilesId', PerfilFoto)
router.put("/edit/:perfilesId", UpdatePerfil)
router.delete("/delete/:perfilesId", DeletePerfil)

export default router
