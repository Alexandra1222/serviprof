import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import DefaultPhoto from '../../img/logo.png'
import Header from '../HomePage/Header/Header'

const Trabajos = () => {
    const [trabajos, setTrabajos] = useState([])
    const [borrar,setBorrar] = useState({})

    const eliminarTrabajo = async(id)=>{
        let response = await fetch(`http://localhost:5000/api/v1/trabajos/delete/${id}`,{
            method:'DELETE'
        })
        const data = await response.json()
        setBorrar(data)
    }

    const confirmarBorrado = (trabajoId)=>{
        let ans = window.confirm("estas seguro que queres eliminar este trabajo?")
        if(ans){
            eliminarTrabajo(trabajoId)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/trabajos/getTrabajos', {
                    method: 'GET'
                })
                const data = await res.json();
                setTrabajos(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        return getData;
    }, [borrar._id])


    return (
        <div className="popular" id="popular">
            
            {/* <h2 className='mt-5 mb-5'>Trabajos Cargados recientemente</h2> */}
            <div className="box-container">
                {!trabajos ? <h2>Cargando..</h2> :
                    trabajos.map((trabajo) => {
                        let photoUrl = trabajo.fotoTrabajo ? `http://localhost:5000/api/v1/trabajos/photo/${trabajo._id}?${new Date().getTime()}` : DefaultPhoto

                        return <div  className="box" key={trabajo._id}>
                            <>
                                <MDBCardImage className="image"
                                    src={photoUrl}
                                    alt={trabajo.name}
                                    /* style={{ height: "300px", width: "100%", objectFit: "cover" }} */
                                />
                                <div className="content">
                                <div className="price">{trabajo.nombreTrabajo}</div>
                                    <div className="stars">
                                        {trabajo.presupuesto}
                                    </div>
                                    <Link to={`editarTrabajo/${trabajo._id}`} state={{ ...trabajo }}
                                        /* className='btn btn-warning' */
                                    >Editar</Link>
                                    <button className="btn"
                                        /* className='btn btn-danger ms-3' */
                                        onClick={()=>confirmarBorrado(trabajo._id)}
                                    >
                                        Eliminar
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

export default Trabajos