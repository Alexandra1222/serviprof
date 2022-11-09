import React,{useState} from 'react'
import {Navigate} from "react-router-dom" 

const AgregarPrestador = () => {
    const [prestadores,setPrestadores]=useState({
        nombrePrestador:"",
        dni:"",
        fechaNacimiento:"",
        sexo:"",
        numeroTelefono:"",
        fotoPerfil:"",
        formData: new FormData(),
        error:"",
        open:false,
    })
    const{nombrePrestador,dni,fechaNacimiento,sexo,numerotelefono,fotoPerfil,formData,error,open}=prestadores

    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="fotoPerfil"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setPrestadores({...prestadores,[name]:value,error:""})
    }

    const submit=async()=>{
        try{
            const res=await fetch(`http://localhost:5000/api/v1/prestador/createprestador`,{
                method:"post",
                body:formData
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                setPrestadores({...prestadores,error:data.error})
            }
            else{
                setPrestadores({nombrePrestador:"",dni:"",fechaNacimiento:"",sexo:"",numeroTelefono:"",fotoPerfil:"",open:true})

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
                <label className='text-muted'>Nombre Completo</label>
                <input 
                type="text"
                value={nombrePrestador}
                name="nombrePrestador"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>DNI Prestador </label>
                <input 
                type="text"
                value={dni}
                name="dni"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Fecha Nacimiento</label>
                <input 
                type="text"
                value={fechaNacimiento}
                name="fechaNacimiento"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Sexo</label>
                <input 
                type="text"
                value={sexo}
                name="sexo"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Numero de Telefono</label>
                <input 
                type="text"
                value={numerotelefono}
                name="numerotelefono"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Foto de Perfil </label>
                <input 
                type="file"
                onChange={handleChange}
                name="fotoPerfil"
                />
            </div>
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>Guardar</button>
        </form>
    }
    if(open){
       return  <Navigate to="/" />
    }
  return (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Alta de Prestadores</h2>
        <div className='alert alert-danger' 
        style={{display:error?"":"none"}}
        >
            {error}
        </div>
        <div className='alert alert-info' 
        style={{display:open?"":"none"}}
        >
            el profesional  guardo satisfactoriamente
        </div>
        {fillForm()}
      

    </div>
  )
}

export default AgregarPrestador