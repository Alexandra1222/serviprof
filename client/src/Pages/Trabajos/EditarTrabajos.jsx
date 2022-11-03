import React,{useEffect, useState} from 'react'
import {Navigate,useLocation} from "react-router-dom" 

const EditarTrabajo = () => {
    const location = useLocation()
    
    const [trabajos,setTrabajos]=useState({
        nombreTrabajo:"",
        presupuesto:"",
        descripcionTrabajo:"",
        fotoTrabajo:"",
        error:"",
        open:false,
    })
    const[form,setForm]=useState({
        formData: new FormData(),
    })
    const {formData} = form;
    const{_id,nombreTrabajo,presupuesto,descripcionTrabajo,fotoTrabajo,error,open}=trabajos

    useEffect(()=>{
       setTrabajos({...location.state})
    },[])
    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="fotoTrabajo"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setTrabajos({...trabajos,[name]:value,error:""})
    }

    const submit=async()=>{
        try{
            const res=await fetch(`http://localhost:5000/api/v1/trabajos/editarTrabajo/${_id}`,{
                method:"PUT",
                body:formData
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                setTrabajos({...trabajos,error:data.error})
            }
            else{
                setTrabajos({nombreTrabajo:"",presupuesto:"",descripcionTrabajo:"",fotoTrabajo:"",open:true})

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
                <label className='text-muted'>nombre del trabajo</label>
                <input 
                type="text"
                value={nombreTrabajo}
                name="nombreTrabajo"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>presupuesto</label>
                <input 
                type="text"
                value={presupuesto}
                name="presupuesto"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>descripcion del trabajo</label>
                <input 
                type="text"
                value={descripcionTrabajo}
                name="descripcionTrabajo"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>foto del trabajo</label>
                <input 
                type="file"
                onChange={handleChange}
                name="fotoTrabajo"
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
        <h2 className='mt-5 mb-5'>Edicion de Trabajos</h2>
        <div className='alert alert-danger' 
        style={{display:error?"":"none"}}
        >
            {error}
        </div>
        <div className='alert alert-info' 
        style={{display:open?"":"none"}}
        >
            editado exitosamente
        </div>
        {fillForm()}
      

    </div>
  )
}

export default EditarTrabajo