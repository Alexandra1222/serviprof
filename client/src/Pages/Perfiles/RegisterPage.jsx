import React ,{useState}from 'react'


export default function RegisterPage() {
    
    const [usuario,setUsuario]=useState({
        nombre:"",
        apellido:"",
        password:"",
        telefono:"",
        fotoPerfil:"",
        formData: new FormData(),
        error:"",
        open:false,
    })
    const{nombre,apellido,password,telefono,fotoPerfil,formData,error,open}=usuario

    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="fotoPerfil"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setUsuario({...usuario,[name]:value,error:""})
    }

    const submit=async()=>{
        try{
            const res=await fetch(`http://localhost:5000/api/v1/perfiles/createProfile`,{
                method:"POST",
                body:formData
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                setUsuario({...usuario,error:data.error})
            }
            else{
                setUsuario({nombre:"", apellido:"",password:"",telefono:"",fotoPerfil:"",open:true})
                
            }
        }
        catch(err){
            console.log(err)
        }
    }

     //form
     const fillForm=()=>{
        return  (
        <form onSubmit={e=>e.preventDefault()}>
        
        <div className='form-group'>
                <label className='text-muted'>nombre</label>
                <input 
                type="text"
                value={nombre}
                name="nombre"
                onChange={handleChange}
                />
        </div>
        <div className='form-group'>
                <label className='text-muted'>apellido</label>
                <input 
                type="text"
                value={apellido}
                name="apellido"
                onChange={handleChange}
                />
        </div>
        <div className='form-group'>
                <label className='text-muted'>password</label>
                <input 
                type="text"
                value={password}
                name="password"
                onChange={handleChange}
                />
        </div>
        <div className='form-group'>
                <label className='text-muted'>telefono</label>
                <input 
                type="text"
                value={telefono}
                name="telefono"
                onChange={handleChange}
                />
        </div>
        <div className='form-group'>
                <label className='text-muted'>foto perfil</label>
                <input 
                type="file"
                onChange={handleChange}
                name="fotoPerfil"
                />
        </div>
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>Guardar</button>
        </form>
        )
    }
   /*  if(open){
       return  <Navigate to="/" />
    } */
  return (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Create Form</h2>
        <div className='alert alert-danger' 
        style={{display:error?"":"none"}}
        > ha ocurrido un error 
            {error}
        </div>
        <div className='alert alert-info' 
        style={{display:open?"":"none"}}
        >
            el  perfil se guardo exitosamente
        </div>
        {fillForm()}
      

    </div>
  )

}
