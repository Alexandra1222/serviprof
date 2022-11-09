import React,{useState} from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import './AgregarServicios.css'


const AgregarServicios = () => {
    const [servicios,setServicios]=useState({
        servicio:"",
        nombre:"",
        fecha:"",
        descripcionServicio:"",
        fotoServicio:"",
        formData: new FormData(),
        error:"",
        open:false,
    })
    const{servicio,nombre,fecha,descripcionServicio,fotoServicio,formData,error,open}=servicios

    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="fotoServicio"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setServicios({...servicios,[name]:value,error:""})
    }

    const submit=async()=>{
        try{
            const res=await fetch(`http://localhost:5000/api/v1/servicios/createServicio`,{
                method:"post",
                body:formData
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                setServicios({...servicios,error:data.error})
            }
            else{
                setServicios({servicio:"",nombre:"",fecha:"",descripcionServicio:"",fotoServicio:"",open:true})

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
                <label className='text-muted'>servicio</label>
                <input 
                type="text"
                value={servicio}
                name="servicio"
                onChange={handleChange}
                />
            </div>
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
                <label className='text-muted'>fecha</label>
                <input 
                type="text"
                value={fecha}
                name="fecha"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>descripcion del servicio</label>
                <input 
                type="text"
                value={descripcionServicio}
                name="descripcionServicio"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>foto del servicio</label>
                <input 
                type="file"
                onChange={handleChange}
                name="fotoServicio"
                />
            </div>
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>Guardar</button>
        </form>
    }
   /*  if(open){
       return  <Navigate to="/" />
    }  */
  return (
    <div className='container'>
        <h2 className='mt-5 mb-5'>Alta de Servicio</h2>
        <div className='alert alert-danger' 
        style={{display:error?"":"none"}}
        >
            {error}
        </div>
        <div className='alert alert-info' 
        style={{display:open?"":"none"}}
        >
            el servicio fue cargado satisfactoriamente
        </div>
        {fillForm()}
      

    </div>
  )
}

export default AgregarServicios