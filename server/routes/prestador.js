/* import express from "express"
const router = express.Router()
import Prestador from '../models/prestador.js';


router.route("/").get((req, res) => {

  Prestador.find()
    .then(prestadores => res.json(prestadores))
    .catch(err => res.status(400).json('Error:' + err))
});

router.route("/agregarPrestador").post((req, res) => {
  const nuevoPrestador = new Prestador(req.body);
  nuevoPrestador.save((error, data) => {
    if (error) return res.status(500).json({ success: false, error });
    return res.status(201).json({
      success: true,
      message: 'el nuevo prestador fue creada  con exito!',
      data,
    });
  });

});

router.route("/obtenerPrestadorPorId/:id").get((req, res) => {
  Prestador.findById(req.params.id).exec((error, data) => {
    if (error)
      return res.status(500).json({
        success: false,
        error,
      });
    return res.status(200).json({
      success: true,
      data,
    });
  });
});

router.route("/editarPrestador/:id").put((req, res) => {
  {
    const {
      telefono,
      fotosCertificaciones,
      fotoTrabajo,
    } = req.body;
    const id = req.params.id;
    Prestador.findOneAndUpdate(id, {
      telefono,
      fotosCertificaciones,
      fotoTrabajo,
    }).exec((error, data) => {
      if (error)
        return res.status(500).json({
          success: false,
          messageError: error.message,
        });
      return res.status(200).json({
        success: true,
        messageOk: 'el prestador fue editado con exito!',
        data,
      });
    });
  };
});

router.route("/eliminarPrestador/:id").delete((req, res) => {
  const { id } = req.params;
  Prestador.deleteOne({ _id: id }, (error, data) => {
    if (error) return res.status(500).json({ success: false, error });
    if (data && data.deletedCount === 0) {
      return res.status(200).json({ success: false });
    }
    return res.json({ success: true });
  });
});

export default router */