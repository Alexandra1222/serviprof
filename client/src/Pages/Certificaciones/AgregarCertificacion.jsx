import React,{useState} from 'react'
import {Navigate} from "react-router-dom" 
import './AgregarCertificacion.css'

const AgregarCertificacion = () => {
    const [certificaciones,setCertificaciones]=useState({
        nombreCertificacion:"",
        fechasAlta:"",
        fechaCaducidad:"",
        entidadCertificante:"",
        fotoCertificacion:"",
        formData: new FormData(),
        error:"",
        open:false,
    })
    const{nombreCertificacion,fechasAlta,fechaCaducidad,entidadCertificante,fotoCertificacion,formData,error,open}=certificaciones

    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="fotoCertificacion"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setCertificaciones({...certificaciones,[name]:value,error:""})
    }

    const submit=async()=>{
        try{
            const res=await fetch(`http://localhost:5000/api/v1/certificaciones/addCertificacion`,{
                method:"post",
                body:formData
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                setCertificaciones({...certificaciones,error:data.error})
            }
            else{
                setCertificaciones({nombreCertificacion:"",fechasAlta:"",fechaCaducidad:"",entidadCertificante:"",fotoCertificacion:"",open:true})

            }
        }
        catch(err){
            console.log(err)
        }
    }
   

    //form
    const fillForm=()=>{
        return  (
        <form className='form' onSubmit={e=>e.preventDefault()}>
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
                <label className='text-muted'>Fecha caducidad</label>
                <input 
                type="text"
                value={fechaCaducidad}
                name="fechaCaducidad"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>entidad certificante</label>
                <input 
                type="text"
                value={entidadCertificante}
                name="entidadCertificante"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>foto  certificacion</label>
                <input 
                type="file"
                onChange={handleChange}
                name="fotoCertificacion"
                />
            </div>
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>Guardar</button>
        </form>)
    }
    if(open){
       return  <Navigate to="/" />
    }
  return (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Alta de certificaciones</h2>
        <div className='alert alert-danger' 
        style={{display:error?"":"none"}}
        >
            {error}
        </div>
        <div className='alert alert-info' 
        style={{display:open?"":"none"}}
        >
            la certificacion fue añadida exitosamente
        </div>
        {fillForm()}
      

    </div>
  )
}

export default AgregarCertificacion