import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import DefaultPhoto from '../../img/logo.png'


const ServicioPage = () => {
    const [servicios, setServicios] = useState([])
    const [borrar,setBorrar] = useState({})

    const eliminarServicio = async(id)=>{
        let response = await fetch(`http://localhost:5000/api/v1/servicios/delete/${id}`,{
            method:'DELETE'
        })
        const data = await response.json()
        setBorrar(data)
    }

    const borradoConfirmado = (servicioId)=>{
        let ans = window.confirm("estas seguro que deseas eliminar el servicio?")
        if(ans){
            eliminarServicio(servicioId)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/servicios/getServicios', {
                    method: 'GET'
                })
                const data = await res.json();
                setServicios(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        return getData;
    }, [borrar._id])


    return (
        <div className="popular" id="popular">
        
            {/* <h2 className='mt-5 mb-5'>Servicios Recientes</h2> */}
            <div className='row'>
                {!servicios ? <h2>Cargando...</h2> :
                    servicios.map((servicio) => {
                        let photoUrl = servicio.fotoServicio ? `http://localhost:5000/api/v1/servicios/photo/${servicio.id}?${new Date().getTime()}` : DefaultPhoto

                        return <div className="box" key={servicio._id}>
                            <>
                                <MDBCardImage className="image"
                                    src={photoUrl}
                                    alt={servicio.name}
                                    /* style={{ height: "300px", width: "100%", objectFit: "cover" }} */
                                />
                                <div className="content">
                                    <div className="price">{servicio.nombre}</div>
                                    <div className="stars">
                                        {servicio.servicio}
                                    </div>
                                    <Link to={`edit/${servicio._id}`} state={{ ...servicio }}
                                        className="btn"
                                    >Editar</Link>
                                    <button
                                        className="btn"
                                        onClick={()=>borradoConfirmado(servicio._id)}
                                    >
                                        Borrar
                                    </button>
                                </div>
                            </>
                        </div>
                    })

                }

            </div>

        </div>
    )
}

export default ServicioPage