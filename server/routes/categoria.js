import express from "express"
const router = express.Router()
import Categoria from '../models/categoria.js';


router.route("/").get((req,res)=> {
    /* res.send("hola probando router !!") */
    Categoria.find()
    .then(categorias => res.json(categorias))
    .catch(err => res.status(400).json('Error:'+ err))
});

router.route("/agregarCategoria").post((req,res)=> {
    const nuevaCategoria = new Categoria(req.body);
    nuevaCategoria.save((error, data) => {
    if (error) return res.status(500).json({ success: false, error });
    return res.status(201).json({
      success: true,
      message: 'la nueva categoria fue creada  con exito!',
      data,
    });
  });

});

router.route("/obtenerCategoriaPorId/:id").get((req,res)=>{
    Categoria.findById(req.params.id).exec((error, data) => {
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

router.route("/editarCategoria/:id").put((req,res)=> {
    {
        const {
          nombre,
          descripcion,
        } = req.body;
        const id = req.params.id;
        Categoria.findOneAndUpdate(id, {
            nombre,
          descripcion,
        }).exec((error, data) => {
          if (error)
            return res.status(500).json({
              success: false,
              messageError: error.message,
            });
          return res.status(200).json({
            success: true,
            messageOk: 'lA CATEGORIA fue editado con exito!',
            data,
          });
        });
      };
});

router.route("/eliminarCategoria/:id").delete((req,res)=> {
const { id } = req.params;
Categoria.deleteOne({ _id: id }, (error, data) => {
    if (error) return res.status(500).json({ success: false, error });
    if (data && data.deletedCount === 0) {
      return res.status(200).json({ success: false });
    }
    return res.json({ success: true });
  });
});




export default router

