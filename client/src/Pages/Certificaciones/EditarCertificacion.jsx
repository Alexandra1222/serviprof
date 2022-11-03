import React,{useEffect, useState} from 'react'
import {Navigate,useLocation} from "react-router-dom" 

const EditarCertificacion = () => {
    const location = useLocation()
    
    const [certificaciones,setCertificaciones]=useState({
        nombreCertificacion:"",
        fechasAlta:"",
        fechaCaducidad:"",
        entidadCertificante:"",
        fotoCertificacion:"",
        error:"",
        open:false,
    })
    const[form,setForm]=useState({
        formData: new FormData(),
    })
    const {formData} = form;
    const{_id,nombreCertificacion,fechasAlta,fechaCaducidad,entidadCertificante,fotoCertificacion,error,open}=certificaciones

    useEffect(()=>{
       setCertificaciones({...location.state})
    },[])
    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="fotoCertificacion"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setCertificaciones({...certificaciones,[name]:value,error:""})
    }

    const submit=async()=>{
        try{
            const res=await fetch(`http://localhost:5000/api/v1/certificaciones/editarCertificacion/${_id}`,{
                method:"PUT",
                body:formData
            })
            const data = await res.json()

            console.log(data)
            if(data.error){
                setCertificaciones({...certificaciones,error:data.error})
            }
            else{
                setCertificaciones({nombreTrabajo:"",presupuesto:"",descripcionTrabajo:"",fotoTrabajo:"",open:true})

            }
        }
        catch(err){
            console.log(err)
        }
    }
   

    //form
    const fillForm=()=>{
        return   <form onSubmit={e=>e.preventDefault()}>
        <div className='form-group'>
                <label className='text-muted'>nombre de la certificacion</label>
                <input 
                type="text"
                value={nombreCertificacion}
                name="nombreCertificacion"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>fecha alta</label>
                <input 
                type="text"
                value={fechasAlta}
                name="fechasAlta"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'> fecha de caducidad</label>
                <input 
                type="text"
                value={fechaCaducidad}
                name="fechaCaducidad"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'> entidad certificante</label>
                <input 
                type="text"
                value={entidadCertificante}
                name="entidadCertificante"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>foto de la certificacion</label>
                <input 
                type="file"
                onChange={handleChange}
                name="fotoCertificacion"
                />
            </div>
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>Actualizar</button>
        </form>
    }
    if(open){
       return  <Navigate to="/" />
    }
  return (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Edicion de certificaciones</h2>
        <div className='alert alert-danger' 
        style={{display:error?"":"none"}}
        >
            {error}
        </div>
        <div className='alert alert-info' 
        style={{display:open?"":"none"}}
        >
            edicion exitosa!
        </div>
        {fillForm()}
      

    </div>
  )
}

export default EditarCertificacion